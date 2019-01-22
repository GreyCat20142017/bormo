import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import MainTheme from './MainTheme';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';

import BormoFooter from './components/BormoFooter';
import BormoHeader from './components/BormoHeader';
import BormoAside from './components/BormoAside';
import BormoConfig from './components/BormoConfig';
import BormoModal from './components/BormoModal';
import ErrorBoundary from './components/ErrorBoundary';

import Main from './pages/Main';
import Bormo from './pages/Bormo';
import Control from './pages/Control';
import ReverseControl from './pages/ReverseControl';
import NotFound from './pages/NotFound';

import './App.css';
import {getDataByCondition,  getArrayFromObject, getInitialState} from './functions';
import {GET_DATA_PATH, GET_COURSES_PATH} from './constants';

import {about} from './about';

const styles = theme => ({
  app: {
    height: '100vh',
    overflow: 'hidden'
  },

  contentMain: {
    width: '90%',
    [theme.breakpoints.down('xs')]: {
      width: '84%',
    }
  },

  paperAside: {
    width: '9%',

    [theme.breakpoints.down('xs')]: {
      width: '15%',
      minWidth: '65px'
    }
  },

  paperLoader: {
    top: 0,
    left: 0,
    height: '100vh',
    width: '100%',
    position: 'fixed',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '10%',
    textAlign: 'center',
    zIndex: '10'
  },

  paperMain: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    padding: '10px 10px 60px',
    width: '100%',
    justifyContent: 'space-between'

  },

  paperHeader: {
    minHeight: '50px',
    overflowY: 'auto'
  },

  paperFooter: {
    height: '54px',
    overflowY: 'auto'
  },

});

const Loader = ({classes}) => (
  <Paper className={classes.paperLoader}>
     <Typography variant='caption' color='primary'>Загрузка...</Typography>
  </Paper>
);

class App extends React.Component {
  static Loader = Loader;

  static defaultProps = {
   themes: getArrayFromObject(MainTheme)
  }

  constructor(props) {
    super(props);
    this.state = getInitialState(MainTheme.neutral);
    this.onCourseChange = this.onCourseChange.bind(this);
    this.onLessonChange = this.onLessonChange.bind(this);
    this.onThemeSelect = this.onThemeSelect.bind(this);
    this._lastLesson = 0;
  }

  get lastLesson() {
    return this._lastLesson;
  }

  componentDidMount() {
    this.getCoursesData();
    this.getBasicData();
  }

  getCoursesData = async () => {
    const res = await axios.get(GET_COURSES_PATH);
    this.setState({ isLoading: false, courses: res.data });
  }

  getBasicData = async () => {
    const res = await axios.get(GET_DATA_PATH);
    this.setState({ isDataLoading: false, data: res.data });
  }

  openModal = () => {
    this.setState({isModalOpen: true});
  }

  closeModal = () => {
    this.setState({isModalOpen: false});
  }

  openConfig = () => {
    this.setState({isConfigOpen: true});
  }

  closeConfig = () => {
    this.setState({isConfigOpen: false});
  }

  onConfigChange = () => {

 }

 onCourseChange (course, ind)  {
   const {currentCourse, courses} = this.state;
   if (course !== currentCourse) {
     if (ind <=  courses.length) {
      this._lastLesson = courses[ind].lastlesson;
      let courseLessons = [];
      for (let i = 1; i <= this._lastLesson; i++) {
        courseLessons.push(i);
      };
      let courselesson = courseLessons.length > 0 ? courseLessons[0] : null;
      this.setState({
       currentCourse: course,
       currentLesson: courselesson,
       lessons: courseLessons
     });
    }
    else {
      this._lastLesson = 0;
    }
  }
}

  onLessonChange (lesson) {
   if (lesson !== this.state.currentLesson) {
    const newData = getDataByCondition(this.state.lessons, this.state.currentCourse, lesson);
    this.setState({
      currentLesson: lesson,
      content: newData.content
    });
   }
  }

  onThemeSelect (themeKey) {
    this.setState({currentTheme: MainTheme[themeKey]});
  }

  render() {
    const {classes, themes} = this.props;
    const {
      currentMode, currentCourse, currentLesson, lessons, courses, content,
      currentTheme, isLoading, isConfigOpen, isModalOpen,
      config, voiceConfig, noSound } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={currentTheme.themeObject}>
        {isLoading ?
          <Loader classes={classes}/>
        :
        <div className={classes.app}>

          <Paper className={classes.paperHeader}>
           <BormoHeader
            theme={currentTheme}
            openModal={this.openModal}
            closeModal={this.closeModal}
            openConfig={this.openConfig}
            closeConfig={this.closeConfig}
            onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}
            />
          </Paper>

          <Paper className={classes.paperMain}>
            <Paper className={classes.paperAside}>
              <ErrorBoundary>
                <BormoAside
                 currentMode={currentMode}
                 currentCourse={currentCourse}
                 currentLesson={currentLesson}
                 lessons={lessons}
                 courses={courses}
                 onLessonChange={this.onLessonChange}
                 onCourseChange={this.onCourseChange}
                 lastLesson={this.lastLesson}
                 />
               </ErrorBoundary>
            </Paper>
            <Paper className={classes.contentMain} content={content}>

              <Switch>
               <Route exact path='/' component={Main}/>
               <Route path='/bormo' component={Bormo}/>
               <Route path='/control' component={Control}/>
               <Route path='/reversecontrol' component={ReverseControl}/>
               {/* <Route path='/config' render={()=><BormoConfig/>}/> */}
               <Route component={NotFound} />
             </Switch>

           </Paper>
          </Paper>

          <Paper className={classes.paperFooter}>
            <BormoFooter onThemeSelect={this.onThemeSelect} currentTheme={currentTheme} themes={themes}/>
          </Paper>
        </div>
      }

      <BormoConfig
                  currentTheme={currentTheme}
                  themes={themes}
                  config={config}
                  voiceConfig={voiceConfig}
                  noSound={noSound}
                  isConfigOpen={isConfigOpen}
                  closeConfig={this.closeConfig}
                  onConfigChange={this.onConfigChange}
                  onThemeSelect={this.onThemeSelect}/>
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


export default withStyles(styles)(withRouter(App));
