import React, {Fragment} from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BormoLesson from './BormoLesson';
import SimpleSlider from './SimpleSlider';

import {MAX_LESSONS_BY_PAGE} from '../constants';

const styles = theme => ({
  root: {
    width: '100%',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    padding: '20px',
    overflowX: 'hidden',
    textAlign: 'center'
  },
  column: {
    flexBasis: '33.33%',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  columnMobile: {
    flexBasis: '100%',
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  btn: {
    textTransform: 'none',
    padding: '0',
    margin: '0 auto',
    textAlign: 'center',
    flexShrink: 1
  },
  lessonList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '90%',
    padding: '10px',
    listStyle: 'none',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
     }
 },
   expanded: {
    display: 'flex'
  },
  collapsed: {
    display: 'none'
  },
  message: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  lessonLiFirst: {
    [theme.breakpoints.down('md')]: {
      '&:nth-of-type(n+6)': {
         display: 'none'
      }
    }
  },
  lessonLiSecond: {
    [theme.breakpoints.down('md')]: {
      '&:nth-of-type(-n+5)': {
         display: 'none'
      }
    }
  },
   actions: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }
});

const Lessons = ({ lessons,  currentLesson, onLessonChange, classes, expanded, firstPart }) => {
  let list = [];
  for (let i = 0; i < Math.min(MAX_LESSONS_BY_PAGE, lessons.length); i++) {
    list.push(
    <li key={i} className={firstPart ? classes.lessonLiFirst : classes.lessonLiSecond}>
      <BormoLesson item={lessons[i]} currentLesson={currentLesson} onLessonChange={onLessonChange}/>
    </li>);
  }
  return (
    <ul className={classNames(classes.lessonList, expanded ? classes.expanded : classes.collapsed)}>
      {list}
    </ul>
  )
};

const BackwardForward = ({currentClass}) => (
  <Fragment>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу назад'>
      <ArrowBackIcon />
      </IconButton>
    </div>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу вперед'>
      <ArrowForwardIcon />
      </IconButton>
    </div>
  </Fragment>
);

class BormoLessons extends React.Component {
  static Lessons = Lessons;

  constructor(props) {
    super(props);
    this.state = {expanded: false, startPage: 1, firstPart: false};
  }

  onPanelSwitch = () => {
    this.setState({expanded: !this.state.expanded});
  }

  onSliderChange = (name, value) => {
    this.setState({ [name]: value});
  };


  render () {
  const {classes, lessons, currentLesson, onLessonChange, lastLesson} = this.props;
  const {expanded, startPage, firstPart} = this.state;
  const sliderParams = {default: 1, min: 1, max: lastLesson, step: 1, title: ''};

  return (lastLesson ?
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded} onChange={this.onPanelSwitch}>
        <ExpansionPanelSummary expanded={expanded} expandIcon={<ExpandMoreIcon />}>

        <BackwardForward currentClass={classes.column}/>

        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails className={classes.details}>
          <SimpleSlider noTitle={true} name='startPage' params={sliderParams} value={startPage} onSliderChange={this.onSliderChange}/>
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions className={classes.actions}>
          <Fab size='small' color='inherit' className={classes.btn} title={'Перейти к странице "Урок ' + startPage + ' - ..."'}>
            <span className={classes.fab}>{startPage}</span>
          </Fab>
            <BackwardForward currentClass={classes.columnMobile}/>
         </ExpansionPanelActions>
      </ExpansionPanel>
      <Lessons lessons={lessons} currentLesson={currentLesson} classes={classes} onLessonChange={onLessonChange} expanded={!expanded} firstPart={firstPart}/>
    </div>
    :
    <Typography variant='caption' className={classes.message}>Не выбран курс или нет уроков</Typography>
  );
  }
}


export default withStyles(styles)(BormoLessons);
