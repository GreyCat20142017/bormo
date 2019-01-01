import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import MainTheme from './MainTheme';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import BormoFooter from './components/BormoFooter';
import BormoHeader from './components/BormoHeader';
import BormoAside from './components/BormoAside';
import BormoConfig from './components/BormoConfig';
import BormoSimpleModal from './components/BormoSimpleModal';

import Main from './pages/Main';
import Bormo from './pages/Bormo';
import Control from './pages/Control';
import ReverseControl from './pages/ReverseControl';

import NotFound from './pages/NotFound';

import './App.css';
import {getDataByCondition} from './functions';
import {courses, lessons} from './data';


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

  contentAside: {
    width: '9%',
    [theme.breakpoints.down('xs')]: {
      width: '15%'
    }
  },

  paperMain: {
    height: '78vh',
    overflowY: 'auto',
    display: 'flex',
    padding: '10px',
    width: '100%',
    justifyContent: 'space-between'
  },

  paperHeader: {
    height: '12vh',
    minHeight: '50px',
    overflowY: 'auto'
  },

  paperFooter: {
    height: '10vh',
    minHeight: '40px',
    overflowY: 'auto'
  },

});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAboutOpen: false,
      isConfigOpen: false,
      currentMode: null,
      currentCourse: null,
      currentLesson: null,
      lessons: [],
      content: [],
      isLoading: false
    };
    this.onCourseChange = this.onCourseChange.bind(this);
    this.onLessonChange = this.onLessonChange.bind(this);
  }

  componentDidMount() {
   // this.setState({ isLoading: true })
   // fetch('http://localhost:3000/data/data.js')
   //  .then(response => {
   //    return response.json()
   //  })
   //  .then(data => {

   //    this.setState({ isLoading: false, news: data })
   //  })
 }

  openAbout = () => {
    this.setState({isAboutOpen: true});
  }

  closeAbout = () => {
    this.setState({isAboutOpen: false});
  }

  openConfig = () => {
    this.setState({isConfigOpen: true});
  }

  closeConfig = () => {
    this.setState({isConfigOpen: false});
  }


  onCourseChange (course)  {
    if (course !== this.state.currentCourse) {
      const newData = getDataByCondition(lessons, course, this.state.currentLesson);
      this.setState({
        currentCourse: course,
        currentLesson: newData.lesson,
        lessons: newData.lessons,
        content: newData.content
      });
    }
  }

  onLessonChange (lesson) {
   if (lesson !== this.state.currentLesson) {
    const newData = getDataByCondition(lessons, this.state.currentCourse, lesson);
    this.setState({
      currentLesson: lesson,
      content: newData.content
    });
     console.log(newData.content);
   }
  }

  render() {
    const {classes} = this.props;
    const {currentMode, currentCourse, currentLesson, lessons, content, isLoading, isConfigOpen, isAboutOpen} = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={MainTheme}>
        {isLoading ?
          <Paper className={classes.paperMain}>
           <Typography variant='caption' color='primary'>Загрузка...</Typography>
          </Paper>
        :
        <div className={classes.app}>

          <Paper className={classes.paperHeader}>
           <BormoHeader
            theme={MainTheme}
            openAbout={this.openAbout}
            closeAbout={this.closeAbout}
            openConfig={this.openConfig}
            closeConfig={this.closeConfig}
            />
          </Paper>

          <Paper className={classes.paperMain}>
            <Paper className={classes.contentAside}>
              <BormoAside
               currentMode={currentMode}
               currentCourse={currentCourse}
               currentLesson={currentLesson}
               lessons={lessons}
               courses={courses}
               onLessonChange={this.onLessonChange}
               onCourseChange={this.onCourseChange}
               />
            </Paper>
            <Paper className={classes.contentMain} content={content}>

              <Switch>
               <Route exact path='/' component={Main}/>
               <Route path='/bormo' component={Bormo}/>
               <Route path='/control' component={Control}/>
               <Route path='/reversecontrol' component={ReverseControl}/>
               <Route component={NotFound} />
             </Switch>

           </Paper>
          </Paper>

          <Paper className={classes.paperFooter}>
            <BormoFooter/>
          </Paper>

        </div>
      }
      <BormoConfig isConfigOpen={isConfigOpen} closeConfig={this.closeConfig}/>
      <BormoSimpleModal title={'О программе'} text={'Бормотунчик - 2018.'} isModalOpen={isAboutOpen} closeModal={this.closeAbout}/>
      </MuiThemeProvider>
     </React.Fragment>
    );
  }
}


export default withStyles(styles)(withRouter(App));

