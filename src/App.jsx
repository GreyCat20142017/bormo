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
import BormoFooter from './components/footer/BormoFooter';
import BormoHeader from './components/header/BormoHeader';
import BormoAside from './components/aside/BormoAside';
import BormoModal from './components/modal/BormoModal';
import ErrorBoundary from './components/ErrorBoundary';

import Main from './pages/main/Main';
import Bormo from './pages/bormo/Bormo';
import Control from './pages/control/Control';
import Spelling from './pages/spelling/Spelling';
import BormoConfig from './pages/config/BormoConfig';
import Search from './pages/search/Search';
import Phrases from './pages/phrases/Phrases';

import NotFound from './pages/notfound/NotFound';
import MainTheme from './MainTheme';

import SpeakerVoice from './SpeakerVoice';
import {styles} from './App.css.js';
import {getValueArrayFromObject, getInitialState} from './functions';
import {
  COURSES_PATH,
  BORMO_PATH,
  WORDS_PER_LESSON,
  PHRASES_PER_LESSON,
  PHRASES_PATH,
  API_BRANCHES,
  STATUS_OK
} from './constants';
import {ROUTES, HOTKEY_REDIRECTS, ROUTES_ORDER} from './routes';

import {about} from './about';
import PhrasesAside from './components/aside/PhrasesAside';

const Loader = ({classes}) => (
  <Paper className={classes.paperLoader}>
    <Typography variant='caption' color='primary'>Загрузка...</Typography>
  </Paper>
);

class App extends React.Component {

  static Loader = Loader;

  static defaultProps = {
    themes: getValueArrayFromObject(MainTheme)
  };

  constructor(props) {
    super(props);
    this.state = getInitialState(MainTheme.neutral);
    this.bormoSpeaker = new SpeakerVoice(this.state.soundMuted, this.state.voiceConfig);
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

  componentDidMount() {
    const isNotBormo = (this.props.location.pathname === ROUTES.PHRASES);
    const params = isNotBormo ?
      [API_BRANCHES.PHRASES, PHRASES_PATH, true] :
      [API_BRANCHES.COURSES, COURSES_PATH, false];
    //todo Косяк от внедрения чуждого бормотунчику режима! Найти и обезвредить.
    this.getCoursesData(...params);
    if (this.bormoSpeaker.supportSound) {
      this.bormoSpeaker.getVoiceList(this.initCurrentSpeaker);
    }
    document.addEventListener('keyup', this.onAppKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onAppKeyPress);
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

  getCoursesData = async (apiBranch, jsonPath, isNotBormo) => {
    let {apiURL, useAPIData} = this.state.config;
    let result = [];
    let res = [];
    if (useAPIData) {
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
      courses: result
    });

  };

  getLessonData = async (lesson, apiBranch, unitsPerLesson, jsonPath, isNotBormo) => {
    let {apiURL, useAPIData} = this.state.config;
    const {currentCourse} = this.state;
    const params = isNotBormo ? {lesson: lesson} : {course: currentCourse, lesson: lesson};
    let result = [];
    let res = [];
    if (useAPIData) {
      try {
        res = await axios.get(apiURL[apiBranch], {params: params});
        result = res && (res.status === STATUS_OK) ? res.data.content : [];
        console.log(result);
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
      currentLesson: lesson
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
  };

  closeSearch = () => {
    this.setState({isSearchOpen: false});
  };


  closeSearch = () => {
    this.setState({isPhrasesOpen: false});
  };

  onConfigChange = () => {
    this.setState({isConfigOpen: false});
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
          currentLesson: null,
          content: []
        });
      }
    }
  };

  onLessonChange = (lesson, hidePanel = false) => {
    const isNotBormo = (this.props.location.pathname === ROUTES.PHRASES);
    const params = isNotBormo ?
      [lesson, API_BRANCHES.PHRASES, PHRASES_PER_LESSON, PHRASES_PATH, true] :
      [lesson, API_BRANCHES.COURSES, WORDS_PER_LESSON, BORMO_PATH, false];
    if (hidePanel) {
      this.setState(state => ({mobileOpen: false}));
    }
    if (lesson !== this.state.currentLesson) {
      this.getLessonData(...params);
    }
  };

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
      this.onLessonChange(currentLesson);
    }
  };

  render() {
    const {classes, themes} = this.props;
    const {
      currentMode, currentCourse, currentLesson, lessons, courses, content,
      currentTheme, isLoading, isConfigOpen, isModalOpen, isSearchOpen,
      config, voiceConfig, soundMuted, lastLesson
    } = this.state;

    const isNotBormo = (this.props.location.pathname === ROUTES.PHRASES);

    const contentMissingMessage = (!Array.isArray(content) || (content.length === 0)) ?
      <React.Fragment>
        <Typography variant='body2' component='p'>Необходимо выбрать курс и урок...</Typography>
        <Hidden smUp implementation='css'>
          <Typography variant='caption' component='p'>Для открытия панели выбора используется этот пункт
            меню:</Typography>
          <AppIcon/>
        </Hidden>
      </React.Fragment> : null;

    const drawer = (
      <ErrorBoundary>
        {isNotBormo ?
          <PhrasesAside
            title={'Режим Phrases'}
            currentLesson={currentLesson}
            currentCourse={'no server'}
            lessons={lessons}
            onLessonChange={this.onLessonChange}
            lastLesson={lastLesson}/> :
          <BormoAside
            currentMode={currentMode}
            currentCourse={currentCourse}
            currentLesson={currentLesson}
            lessons={lessons}
            courses={courses}
            onLessonChange={this.onLessonChange}
            onCourseChange={this.onCourseChange}
            lastLesson={lastLesson}
          />
        }
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
                           currentCourse={currentCourse} contentMissingMessage={contentMissingMessage}
                           onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}/>
                  }/>
                  <Route path={ROUTES.CONTROL} render={() =>
                    <Control content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                             currentCourse={currentCourse} contentMissingMessage={contentMissingMessage}
                             reverse={false} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}/>
                  }/>
                  <Route path={ROUTES.REVERSE} render={() =>
                    <Control content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                             currentCourse={currentCourse} contentMissingMessage={contentMissingMessage}
                             reverse={true} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}/>
                  }/>
                  <Route path={ROUTES.SPELLING} render={() =>
                    <Spelling content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                              currentCourse={currentCourse} contentMissingMessage={contentMissingMessage}
                              reverse={true} onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                              onRestartClick={this.onRestartClick}/>
                  }/>
                  <Route path={ROUTES.SEARCH} render={() =>
                    <Search bormoSpeaker={this.bormoSpeaker} isSearchOpen={isSearchOpen}
                            closeSearch={this.closeSearch}/>
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

            {isNotBormo ? null :
              <Paper className={classes.paperFooter}>
                <BormoFooter onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}
                             onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                             onSearchClick={this.onSearchClick} onRestartClick={this.onRestartClick}/>
              </Paper>
            }
          </div>

          <BormoModal
            title={'Бормотунчик - 2018. '}
            text={about}
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}/>

        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(App));
