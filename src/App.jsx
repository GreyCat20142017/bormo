import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {debounce} from 'lodash';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import {withStyles} from '@material-ui/core/styles';

import BormoFooter from './components/footer/BormoFooter';
import BormoModal from './components/modal/BormoModal';
import DataSourceSelector from './components/DataSourceSelector';
import Loader from './components/Loader';
import SpeakerVoice from './SpeakerVoice';
import MainTheme from './MainTheme';

import {about} from './about';
import {AppRoutes} from './appparts/AppRoutes';
import {AppHeader} from './appparts/AppHeader';
import {AppDrawer} from './appparts/AppDrawer';

import {HOTKEY_REDIRECTS, ROUTES, ROUTES_ORDER, SWITCHABLE_ROUTES} from './routes';
import {getInitialState, getStatusText, getValueArrayFromObject} from './functions';
import {
  API_BRANCHES,
  BORMO_PATH,
  COURSES_PATH,
  DATA_SOURCES,
  DEBOUNCE_INTERVAL,
  PHRASES_PATH,
  PHRASES_PER_LESSON,
  STATUS_OK,
  TEST_KEY,
  WORDS_PER_LESSON
} from './constants';

import {styles} from './App.css';

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

  getCoursesData = async (apiBranch, jsonPath, isNotBormo, key = null) => {
    let result = [];
    let res = [];
    let APIkey = key ? key : this.state.APIkey;
    let useAPIData = (APIkey !== TEST_KEY);
    let apiURL = DATA_SOURCES[APIkey];
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
        result = [{name: 'test', lastlesson: 3}];
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
      APIkey: APIkey
    });
  };

  getLessonData = async (lesson, apiBranch, unitsPerLesson, jsonPath, isNotBormo) => {
    let {APIkey} = this.state;
    const {currentCourse} = this.state;
    const params = isNotBormo ? {lesson: lesson} : {course: currentCourse, lesson: lesson};
    let apiURL = DATA_SOURCES[APIkey];
    let result = [];
    let res = [];
    let useAPIData = (APIkey !== TEST_KEY);
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
      result = res.data.filter((el, ind) => {
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
    this.props.history.push(ROUTES.MAIN);
  };

  onConfigChange = (changedConfig) => {
    const {APIkey} = this.state;
    this.setState(Object.assign({}, {...changedConfig, isConfigOpen: false}));
    this.props.history.push(ROUTES.MAIN);
    if (APIkey !== changedConfig.APIkey) {
      const params = getCourseParams(this.state.isNotBormo);
      this.getCoursesData(...params, changedConfig.APIkey);
    }
    this.bormoSpeaker.mute(changedConfig.soundMuted);
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
    this.getCoursesData(...params, sourceKey);
  };

  render() {
    const {classes, themes, location} = this.props;
    const {
      currentMode, currentCourse, currentLesson, lessons, courses, currentTheme, mobileOpen,
      isModalOpen, isNotBormo, config, lastLesson
    } = this.state;
    const hideFooter = SWITCHABLE_ROUTES.filter(item => item !== ROUTES.MAIN).indexOf(location.pathname) !== -1;

    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={currentTheme.themeObject}>
          <div className={classes.root}>
            <CssBaseline/>

            <AppHeader classes={classes} currentTheme={currentTheme} themes={themes}
                       onDrawerToggle={this.onDrawerToggle}
                       openModal={this.openModal} closeModal={this.closeModal}
                       openConfig={this.openConfig} closeConfig={this.closeConfig} onThemeSelect={this.onThemeSelect}/>

            <AppDrawer classes={classes} currentTheme={currentTheme} themes={themes} lastLesson={lastLesson}
                       currentMode={currentMode} currentCourse={currentCourse} currentLesson={currentLesson}
                       lessons={lessons} courses={courses} mobileOpen={mobileOpen}
                       onDebouncedLessonChange={this.onDebouncedLessonChange} onCourseChange={this.onCourseChange}
                       onDrawerToggle={this.onDrawerToggle} openModal={this.openModal} closeModal={this.closeModal}
                       openConfig={this.openConfig} closeConfig={this.closeConfig} onThemeSelect={this.onThemeSelect}/>

            <AppRoutes {...this.props} {...this.state} bormoSpeaker={this.bormoSpeaker} config={config}
                       onNextClick={this.onNextClick} onPreviousClick={this.onPreviousClick}
                       onRestartClick={this.onRestartClick} moveOn={this.moveOn}
                       closeConfig={this.closeConfig} onConfigChange={this.onConfigChange}
                       onThemeSelect={this.onThemeSelect}/>

            {hideFooter || isNotBormo ?
              <DataSourceSelector onSelectDataSource={this.onSelectDataSource} fixed={true}/> :
              <Paper className={classes.paperFooter}>
                <BormoFooter onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}
                             statusText={getStatusText(location.pathname, currentCourse, currentLesson)}
                             onPreviousClick={this.onPreviousClick} onNextClick={this.onNextClick}
                             onSearchClick={this.onSearchClick} onRestartClick={this.onRestartClick}
                             onSelectDataSource={this.onSelectDataSource}/>

              </Paper>
            }
          </div>

          <BormoModal
            title={'Бормотунчик - 2019'}
            text={about}
            isModalOpen={isModalOpen}
            closeModal={this.closeModal}/>

        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(App));
