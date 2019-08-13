import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import AppIcon from '@material-ui/icons/Apps';
import OffIcon from '@material-ui/icons/HighlightOff';

import {withStyles} from '@material-ui/core/styles';

import axios from 'axios';
import {debounce} from 'lodash';

import Main from './pages/main/Main';

import Bormo from './pages/bormo/Bormo';
import Control from './pages/control/Control';
import Spelling from './pages/spelling/Spelling';
import BormoConfig from './pages/config/BormoConfig';
import Search from './pages/search/Search';
import Phrases from './pages/phrases/Phrases';
import SkyengSearch from './pages/sky/SkyengSearch';
import NotFound from './pages/notfound/NotFound';
import BormoFooter from './components/footer/BormoFooter';

import BormoHeader from './components/header/BormoHeader';
import BormoAside from './components/aside/BormoAside';
import BormoModal from './components/modal/BormoModal';
import ErrorBoundary from './components/ErrorBoundary';
import DataSourceSelector from './components/DataSourceSelector';
import SpeakerVoice from './SpeakerVoice';

import MainTheme from './MainTheme';
import {ROUTES, HOTKEY_REDIRECTS, ROUTES_ORDER, SWITCHABLE_ROUTES} from './routes';
import {about} from './about';
import {getValueArrayFromObject, getInitialState} from './functions';

import {
  COURSES_PATH, BORMO_PATH,
  WORDS_PER_LESSON, PHRASES_PER_LESSON,
  PHRASES_PATH, API_BRANCHES, STATUS_OK,
  DATA_SOURCES, TEST_KEY, DEBOUNCE_INTERVAL
} from './constants';
import {styles} from './App.css.js';


const Loader = ({classes}) => (
  <Paper className={classes.paperLoader}>
    <Typography variant='caption' color='primary'>Загрузка...</Typography>
  </Paper>
);

const getCourseParams = (isNotBormo) => (isNotBormo ?
  [API_BRANCHES.PHRASES, PHRASES_PATH, true] :
  [API_BRANCHES.COURSES, COURSES_PATH, false]);

class App extends React.Component {

  static Loader = Loader;

  static defaultProps = {
    themes: getValueArrayFromObject(MainTheme)
  };

  constructor(props) {
    super(props);
    this.state = getInitialState(MainTheme.neutral, (this.props.location.pathname === ROUTES.PHRASES), (this.props.location.pathname === ROUTES.CONFIG));
    this.bormoSpeaker = new SpeakerVoice(this.state.soundMuted, this.state.voiceConfig);
    this.onDebouncedLessonChange = debounce(this.onDebouncedLessonChange.bind(this), DEBOUNCE_INTERVAL);
    }

  initCurrentSpeaker = (voices) => {
    this.voiceList = voices;
    this.bormoSpeaker.setSpeaker(voices);
    this.bormoSpeaker.mute(this.state.soundMuted);
    if (this.bormoSpeaker.speaker) {
      this.setState({
        voiceConfig: Object.assign({}, {
          volume: this.bormoSpeaker.speaker.ssu.volume,
          pitch: this.bormoSpeaker.speaker.ssu.pitch,
          rate: this.bormoSpeaker.speaker.ssu.rate
        })
      });
    }
  };

  refineAsideContent = (location, force = false) => {
    const isNotBormo = (location.pathname === ROUTES.PHRASES);
    const needUpdate = (isNotBormo !== this.state.isNotBormo);
    const params = getCourseParams(isNotBormo);
    if (force || needUpdate) {
      this.setState(() => ({isNotBormo: isNotBormo}));
      this.getCoursesData(...params);
    }
  };

  componentDidMount() {
    this.refineAsideContent(this.props.location.pathname, true);
    this.unlisten = this.props.history.listen((location, action) => {
      this.refineAsideContent(location);
    });
    if (this.bormoSpeaker.supportSound) {
      this.bormoSpeaker.getVoiceList(this.initCurrentSpeaker);
    }
    document.addEventListener('keyup', this.onAppKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onAppKeyPress);
    this.unlisten();
  }

  onAppKeyPress = (evt) => {
    const charCode = String.fromCharCode(evt.which).toLowerCase();
    if (evt.altKey) {
      if (HOTKEY_REDIRECTS.hasOwnProperty(charCode)) {
        evt.preventDefault();
        this.props.history.push(HOTKEY_REDIRECTS[charCode]);
      }
      if (charCode === 'x' || charCode === 'ч') {
        const index = ROUTES_ORDER.indexOf(this.props.location.pathname);
        if (index !== -1) {
          const nextIndex = index < (ROUTES_ORDER.length - 1) ? index + 1 : 0;
          this.props.history.push(ROUTES_ORDER[nextIndex]);
        }
      }
    }
  };

  getCoursesData = async (apiBranch, jsonPath, isNotBormo, key = null, useAPI = null) => {
    let result = [];
    let res = [];
    let APIkey = key ? key : this.state.APIkey;
    let useAPIData = useAPI ? useAPI : this.state.useAPIData;
    let apiURL = DATA_SOURCES[APIkey];
    useAPIData = (APIkey === TEST_KEY) ? false : useAPIData;
    this.setState(() => ({isLoading: true}));
    if (useAPIData && apiURL) {
      try {
        res = await axios.get(apiURL[apiBranch]);
        result = res && (res.status === STATUS_OK ? res.data.info : []);
      } catch (err) {
        useAPIData = false;
      }
    }
    if (!useAPIData) {
      if (isNotBormo) {
        result = [{name: 'no server', lastlesson: 3}];
      } else {
        res = await axios.get(jsonPath);
        result = res ? res.data : [];
      }
    }
    this.setState({
      isLoading: false,
      courses: result,
      isNotBormo: isNotBormo,
      currentCourse: 0,
      currentLesson: 0,
      content: [],
      useAPIData: useAPIData,
      APIkey: APIkey
    });

  };

  getLessonData = async (lesson, apiBranch, unitsPerLesson, jsonPath, isNotBormo) => {
    let {APIkey, useAPIData} = this.state;
    const {currentCourse} = this.state;
    const params = isNotBormo ? {lesson: lesson} : {course: currentCourse, lesson: lesson};
    let apiURL = DATA_SOURCES[APIkey];
    let result = [];
    let res = [];
    useAPIData = (APIkey === TEST_KEY) ? false : useAPIData;
    this.setState(() => ({isLoading: true}));
    if (useAPIData && apiURL) {
      try {
        res = await axios.get(apiURL[apiBranch], {params: params});
        result = res && (res.status === STATUS_OK) ? res.data.content : [];
      } catch (err) {
        useAPIData = false;
      }
    }
    if (!useAPIData) {
      res = await axios.get(jsonPath);
      result = res.data.filter(el => el.course === currentCourse).filter((el, ind) => {
        const startInd = (parseInt(lesson, 10) - 1) * unitsPerLesson || 0;
        return (ind >= startInd && ind < (startInd + unitsPerLesson));
      });
    }

    this.setState({
      isLoading: false,
      content: result,
      currentLesson: lesson,
      useAPIData: useAPIData
    });
  };

  openModal = () => {
    this.setState({isModalOpen: true});
  };

  closeModal = () => {
    this.setState({isModalOpen: false});
  };

  openConfig = () => {
    this.setState({isConfigOpen: true});
  };

  closeConfig = () => {
    this.setState({isConfigOpen: false});
    this.props.history.push(ROUTES.MAIN);
  };

  onConfigChange = (changedConfig) => {
    const {APIkey, useAPIData} = this.state;
    this.setState(Object.assign({}, {...changedConfig, isConfigOpen: false}));
    this.props.history.push(ROUTES.MAIN);
    if (APIkey !== changedConfig.APIkey || useAPIData !== changedConfig.useAPIData) {
      const params = getCourseParams(this.state.isNotBormo);
      this.getCoursesData(...params, changedConfig.APIkey, (changedConfig.APIkey !== TEST_KEY));
    }
  };

  onCourseChange = (course, ind) => {
    const {currentCourse, courses} = this.state;
    if (course !== currentCourse) {
      if (ind <= courses.length) {
        let newLast = courses[ind].lastlesson;

        let courseLessons = [];
        for (let i = 1; i <= newLast; i++) {
          courseLessons.push(i);
        }

        this.setState({
          currentCourse: course,
          lastLesson: newLast,
          lessons: courseLessons,
          currentLesson: 0,
          content: []
        });
      }
    }
  };

  onLessonChange = (lesson, hidePanel = false, force = false) => {
    const isNotBormo = (this.props.location.pathname === ROUTES.PHRASES);
    const params = isNotBormo ?
      [lesson, API_BRANCHES.PHRASES, PHRASES_PER_LESSON, PHRASES_PATH, true] :
      [lesson, API_BRANCHES.COURSES, WORDS_PER_LESSON, BORMO_PATH, false];
    if (hidePanel) {
      this.setState(state => ({mobileOpen: false}));
    }
    if (force || lesson !== this.state.currentLesson) {
      this.getLessonData(...params);
    }
  };

  onDebouncedLessonChange(lesson, hidePanel = false, force = false) {
    this.onLessonChange(lesson, hidePanel, force);
  }

  onThemeSelect = (themeKey) => {
    this.setState({currentTheme: MainTheme[themeKey]});
  };

  onDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };

  onPreviousClick = () => {
    const {currentLesson} = this.state;
    if (currentLesson > 1) {
      this.onLessonChange(currentLesson - 1);
    }
  };

  onNextClick = () => {
    const {lastLesson, currentLesson} = this.state;
    if (currentLesson < lastLesson) {
      this.onLessonChange(currentLesson + 1);
    }
  };

  onRestartClick = () => {
    const {lastLesson, currentLesson} = this.state;
    if (currentLesson <= lastLesson) {
      this.onLessonChange(currentLesson, true, true);
    }
  };

  moveOn = () => {
    const ind = ROUTES_ORDER.indexOf(this.props.location.pathname);
    if ((ind !== -1) && (ind < ROUTES_ORDER.length - 1)) {
      this.props.history.push(ROUTES_ORDER[ind + 1]);
    } else {
      this.onNextClick();
      this.props.history.push(ROUTES.BORMO);
    }
  };

  onSelectDataSource = (sourceKey) => {
    const params = getCourseParams(this.state.isNotBormo);
    this.getCoursesData(...params, sourceKey, (sourceKey !== TEST_KEY));
  };

  render() {
    const {classes, themes, location} = this.props;
    const {
      currentMode, currentCourse, currentLesson, lessons, courses, content, currentTheme, APIkey, useAPIData,
      isLoading, isConfigOpen, isModalOpen, isNotBormo, config, voiceConfig, soundMuted, lastLesson
    } = this.state;
    const hideFooter = SWITCHABLE_ROUTES.filter(item => item !== ROUTES.MAIN).indexOf(location.pathname) !== -1;

    const drawer = (
      <ErrorBoundary>
        <BormoAside
          currentMode={currentMode}
          currentCourse={currentCourse}
          currentLesson={currentLesson}
          lessons={lessons}
          courses={courses}
          onLessonChange={this.onDebouncedLessonChange}
          onCourseChange={this.onCourseChange}
          lastLesson={lastLesson}
        />
      </ErrorBoundary>
    );

    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={currentTheme.themeObject}>
          <div className={classes.root}>
            <CssBaseline/>
            <AppBar position='fixed' className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color='secondary'
                  aria-label='Открыть панель'
                  onClick={this.onDrawerToggle}
                  className={classes.menuButton}
                  title='Открыть панель выбора курса и уроков'
                >
                  <AppIcon/>
                </IconButton>

                <BormoHeader
                  theme={currentTheme}
                  openModal={this.openModal}
                  closeModal={this.closeModal}
                  openConfig={this.openConfig}
                  closeConfig={this.closeConfig}
                  onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}/>

              </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
              <Hidden smUp implementation='css'>
                <Drawer
                  variant='temporary'
                  anchor={'left'}
                  open={this.state.mobileOpen}
                  onClose={this.onDrawerToggle}
                  classes={{paper: classes.drawerPaper}}
                >
                  <React.Fragment>
                    <IconButton
                      color='secondary'
                      aria-label='Закрыть панель'
                      onClick={this.onDrawerToggle}
                      className={classes.menuButton}
                      title='Закрыть панель выбора курса и уроков без выбора'
                    >
                      <OffIcon/>
                    </IconButton>
                    <Divider/>
                    {drawer}
                  </React.Fragment>
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation='css'>
                <Drawer
                  classes={{paper: classes.drawerPaper}}
                  variant='permanent'
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>

            <main className={classes.content}>
              {isLoading ?
                <Typography variant='caption'>Данные загружаются...</Typography> :

                <Switch>
                  <Route exact path={ROUTES.MAIN} component={Main}/>
                  <Route path={ROUTES.BORMO} render={() =>
                    <Bormo content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                           currentCourse={currentCourse} config={config}
                           onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                           onRestartClick={this.onRestartClick} moveOn={this.moveOn}/>
                  }/>
                  <Route path={ROUTES.CONTROL} render={() =>
                    <Control content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                             currentCourse={currentCourse} config={config}
                             reverse={false} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                             onRestartClick={this.onRestartClick} moveOn={this.moveOn}/>
                  }/>
                  <Route path={ROUTES.REVERSE} render={() =>
                    <Control content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                             currentCourse={currentCourse} config={config}
                             reverse={true} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                             onRestartClick={this.onRestartClick} moveOn={this.moveOn}/>
                  }/>
                  <Route path={ROUTES.SPELLING} render={() =>
                    <Spelling content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                              currentCourse={currentCourse} config={config}
                              reverse={true} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                              onRestartClick={this.onRestartClick} moveOn={this.moveOn}/>
                  }/>
                  <Route path={ROUTES.SEARCH} render={() => <Search bormoSpeaker={this.bormoSpeaker} APIkey={APIkey}/>}
                  />
                  <Route path={ROUTES.SKYENG} render={() => <SkyengSearch/>
                  }/>
                  <Route path={ROUTES.PHRASES} render={() =>
                    <Phrases content={content} bormoSpeaker={this.bormoSpeaker} closePhrases={this.closePhrases}
                             currentSection={currentLesson}/>
                  }/>
                  <Route path={ROUTES.CONFIG} render={() =>
                    <BormoConfig
                      currentTheme={currentTheme}
                      themes={themes}
                      config={config}
                      voiceConfig={voiceConfig}
                      soundMuted={soundMuted}
                      APIkey={APIkey}
                      useAPIData={useAPIData}
                      bormoSpeaker={this.bormoSpeaker}
                      isConfigOpen={isConfigOpen}
                      closeConfig={this.closeConfig}
                      onConfigChange={this.onConfigChange}
                      onThemeSelect={this.onThemeSelect}/>
                  }/>
                  <Route component={NotFound}/>
                </Switch>
              }
            </main>

            {hideFooter || isNotBormo ?
              <DataSourceSelector onSelectDataSource={this.onSelectDataSource} fixed={true}/> :
              <Paper className={classes.paperFooter}>
                <BormoFooter onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}
                             onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                             onSearchClick={this.onSearchClick} onRestartClick={this.onRestartClick}
                             onSelectDataSource={this.onSelectDataSource}/>
              </Paper>
            }
          </div>

          <BormoModal
            title={'Бормотунчик - 2019. '}
            text={about}
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}/>

        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(App));
