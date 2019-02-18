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
import SwapCallsIcon from '@material-ui/icons/SwapCalls';

import BormoLesson from './BormoLesson';
import SimpleSlider from './SimpleSlider';

import {PAGE_LIMIT} from '../constants';

const styles = theme => ({
  root: {
    width: '100%',
  },
 fab: {
    margin: theme.spacing.unit,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: '80%',
    textTransform: 'none',
    flexShrink: 1
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
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
    display: 'none',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      display: 'flex'
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
      justifyContent: 'center',
      margin: 0,
      padding: '4px'
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
    [theme.breakpoints.down('md')]: {
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
  },
  swapBtn: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      marginTop: '4px',
      marginBottom: '4px',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block'
    }
  },
  hidden: {
    display: 'none'
  },
  extend: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
}});

const getPositionTo = (position, max, limit) => (position +  Math.min(limit, max - position + 1) - 1);
const getNextTo = (position, max, limit) => ((position + limit) >= max ? position : position + limit);
const getPrevTo = (position, min, limit) => ((position - limit) <= 1 ? 1 : position - limit);
const getSpecifiedStart = (state) => (state.expanded && state.paginationStart !== state.paginationStartTmp ?
      state.paginationStartTmp : state.paginationStart);

const Lessons = ({ lessons,  currentLesson, onLessonChange, classes, expanded, firstPart, start, finish }) => {
  let list = [];

  for (let i = start; i <= finish; i++) {
    list.push(
    <li key={i} className={firstPart ? classes.lessonLiFirst : classes.lessonLiSecond}>
      <BormoLesson item={lessons[i - 1]} currentLesson={currentLesson} onLessonChange={onLessonChange}/>
    </li>);
  }
  return (
    <ul className={classNames(classes.lessonList, expanded ? classes.expanded : classes.collapsed)}>
      {list}
    </ul>
  )
};

const BackwardForward = ({currentClass, onPrevClick, onNextClick}) => (
  <Fragment>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу назад' onClick={onPrevClick}>
      <ArrowBackIcon />
      </IconButton>
    </div>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу вперед' onClick={onNextClick}>
      <ArrowForwardIcon />
      </IconButton>
    </div>
  </Fragment>
);


class BormoLessons extends React.Component {
  static Lessons = Lessons;
  static defaultProps = {
    defaultStart:  1
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      firstPart: false,
      paginationFrom: this.props.defaultStart,
      paginationTo: this.props.lastLesson,
      paginationStart: this.props.defaultStart,
      paginationFinish: getPositionTo(this.props.defaultStart, this.props.lastLesson, PAGE_LIMIT),
      paginationStartTmp: this.props.defaultStart
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        paginationStart: nextProps.currentLesson || this.props.defaultStart,
        paginationFinish: getPositionTo(nextProps.currentLesson || this.props.defaultStart, nextProps.lastLesson, PAGE_LIMIT),
        paginationStartTmp: this.props.currentLesson || this.props.defaultStart
    });
  }

  onPanelSwitch = (evt) => {
    this.setState({expanded: !this.state.expanded});
  }

  onSliderChange = (name, value) => {
    this.setState({ [name]: value});
  };

  onSwapParts = () => {
    const newFirstPartState = !this.state.firstPart;
    this.props.onLessonChange(newFirstPartState ? this.state.paginationStart : getPositionTo(this.state.paginationStart, this.state.paginationTo, PAGE_LIMIT))
    this.setState({firstPart: !this.state.firstPart});
  }

  onPageJump = () => {
    this.props.onLessonChange(this.state.paginationStartTmp);
    this.setState({
      firstPart: true,
      paginationStart: this.state.paginationStartTmp,
      paginationFinish:  getPositionTo(this.state.paginationStartTmp, this.state.paginationTo, PAGE_LIMIT)
    });
  }

  onPrevClick = () => {
    const prev = getPrevTo(getSpecifiedStart(this.state), 1, PAGE_LIMIT);
    this.props.onLessonChange(prev);
    this.setState({
      firstPart: true,
      paginationStart: prev,
      paginationStartTmp: prev,
      paginationFinish:  getPositionTo(prev, this.state.paginationTo, PAGE_LIMIT)
    });
  }

  onNextClick = () => {
    const next = getNextTo(getSpecifiedStart(this.state), this.state.paginationTo, PAGE_LIMIT);
    this.props.onLessonChange(next);
    this.setState({
      firstPart: true,
      paginationStart: next,
      paginationStartTmp: next,
      paginationFinish:  getPositionTo(next, this.state.paginationTo, PAGE_LIMIT)
    });
  }

  render () {
  const {classes, lessons, currentLesson, onLessonChange, lastLesson} = this.props;
  const {expanded, paginationStart, paginationFinish, paginationStartTmp, firstPart} = this.state;
  const sliderParams = {default: paginationStart, min: 1, max: lastLesson, step: 1, title: ''};

  return (lastLesson ?
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded} onChange={this.onPanelSwitch}>
        <ExpansionPanelSummary expanded={expanded} expandIcon={<ExpandMoreIcon />}>

        <BackwardForward currentClass={classes.column} onPrevClick={this.onPrevClick} onNextClick={this.onNextClick}/>

        </ExpansionPanelSummary>
        <Divider/>
        <ExpansionPanelDetails className={classes.details}>
          <SimpleSlider noTitle={true} name='paginationStartTmp' params={sliderParams} value={paginationStartTmp} onSliderChange={this.onSliderChange}/>
        </ExpansionPanelDetails>
        <Divider/>
        <ExpansionPanelActions className={classes.actions}>
          <Fab variant="extended" color='inherit' className={classes.fab}
            title={'Перейти к странице "Урок ' + paginationStartTmp + ' - ..."'}
            onClick={this.onPageJump}>
            {'c ' + paginationStartTmp}
          </Fab>
          <BackwardForward currentClass={classes.columnMobile} onPrevClick={this.onPrevClick} onNextClick={this.onNextClick}/>
         </ExpansionPanelActions>
      </ExpansionPanel>
      <IconButton size='small' color='secondary'
        className={expanded ? classes.hidden : classes.swapBtn} title={'Переключить части текущей страницы'} onClick={this.onSwapParts}>
         <SwapCallsIcon />
      </IconButton>

      <Lessons
        lessons={lessons}
        currentLesson={currentLesson}
        classes={classes}
        onLessonChange={onLessonChange}
        expanded={!expanded}
        start={paginationStart}
        finish={paginationFinish}
        firstPart={firstPart}
      />
    </div>
    :
    <Typography variant='caption' className={classes.message}>Не выбран курс или нет уроков</Typography>
  );
  }
}


export default withStyles(styles)(BormoLessons);
