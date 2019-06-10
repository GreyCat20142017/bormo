import React from 'react';

import {withStyles} from '@material-ui/core/styles';
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
    listStyle: 'none'
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
    textAlign: 'center'
  },
  actions: {
    padding: '4px'
  }
});

const getPositionTo = (position, max, limit) => (position + Math.min(limit, max - position + 1) - 1);
const getNextTo = (position, max, limit) => ((position + limit) >= max ? position : position + limit);
const getPrevTo = (position, min, limit) => ((position - limit) <= 1 ? 1 : position - limit);
const getSpecifiedStart = (state) => (state.expanded && state.paginationStart !== state.paginationStartTmp ?
  state.paginationStartTmp : state.paginationStart);

const Lessons = ({lessons, currentLesson, onLessonChange, classes, expanded, start, finish}) => {
  let list = [];

  for (let i = start; i <= finish; i++) {
    list.push(
      <li key={i}>
        <BormoLesson item={lessons[i - 1]} currentLesson={currentLesson} onLessonChange={onLessonChange}/>
      </li>);
  }
  return (
    <ul className={classNames(classes.lessonList, expanded ? classes.expanded : classes.collapsed)}>
      {list}
    </ul>
  )
};

const BackwardForward = ({currentClass, onPrevClick, onNextClick, classes}) => (
  <ExpansionPanelActions className={classes.actions}>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу назад'
                  onClick={onPrevClick}>
        <ArrowBackIcon/>
      </IconButton>
    </div>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу вперед'
                  onClick={onNextClick}>
        <ArrowForwardIcon/>
      </IconButton>
    </div>
  </ExpansionPanelActions>
);

class BormoLessons extends React.Component {
  static Lessons = Lessons;
  static defaultProps = {
    defaultStart: 1
  };

  constructor(props) {
    super(props);
    const start = PAGE_LIMIT <= this.props.lastLesson ? this.props.currentLesson || this.props.defaultStart : this.props.defaultStart;
    this.state = {
      expanded: false,
      paginationFrom: this.props.defaultStart,
      paginationTo: this.props.lastLesson,
      paginationStart: start,
      paginationFinish: getPositionTo(this.props.defaultStart, this.props.lastLesson, PAGE_LIMIT),
      paginationStartTmp: start
    };
  }

  componentWillReceiveProps(nextProps) {
    const start = PAGE_LIMIT <= nextProps.lastLesson ? nextProps.currentLesson || this.props.defaultStart : this.props.defaultStart;
    this.setState({
      paginationTo: nextProps.lastLesson,
      paginationStart: start,
      paginationFinish: getPositionTo(nextProps.currentLesson || this.props.defaultStart, nextProps.lastLesson, PAGE_LIMIT),
      paginationStartTmp: start
    });
  }

  onPanelSwitch = () => {
    this.setState({
      expanded: !this.state.expanded,
      paginationStartTmp: this.props.currentLesson || this.props.defaultStart
    });
  }

  onSliderChange = (name, value) => {
    this.setState({[name]: value});
  };

  onPageJump = () => {
    this.props.onLessonChange(this.state.paginationStartTmp);
    this.setState({
      paginationStart: this.state.paginationStartTmp,
      paginationFinish: getPositionTo(this.state.paginationStartTmp, this.state.paginationTo, PAGE_LIMIT),
      expanded: false
    });
  }

  onPrevClick = (evt) => {
    evt.stopPropagation();
    const prev = getPrevTo(getSpecifiedStart(this.state), 1, PAGE_LIMIT);
    this.props.onLessonChange(prev);
    this.setState({
      paginationStart: prev,
      paginationStartTmp: prev,
      paginationFinish: getPositionTo(prev, this.state.paginationTo, PAGE_LIMIT)
    });
  }

  onNextClick = (evt) => {
    evt.stopPropagation();
    const next = getNextTo(getSpecifiedStart(this.state), this.state.paginationTo, PAGE_LIMIT);
    this.props.onLessonChange(next);
    this.setState({
      paginationStart: next,
      paginationStartTmp: next,
      paginationFinish: getPositionTo(next, this.state.paginationTo, PAGE_LIMIT)
    });
  }

  render() {
    const {classes, lessons, currentLesson, onLessonChange, lastLesson} = this.props;
    const {expanded, paginationStart, paginationFinish, paginationStartTmp} = this.state;
    const sliderParams = {default: currentLesson || paginationStartTmp, min: 1, max: lastLesson, step: 1, title: ''};
    return (lastLesson ?
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded} onChange={this.onPanelSwitch}>
            <ExpansionPanelSummary expanded={expanded} expandIcon={<ExpandMoreIcon/>}>

              <BackwardForward currentClass={classes.column} onPrevClick={this.onPrevClick}
                               onNextClick={this.onNextClick} classes={classes}/>

            </ExpansionPanelSummary>
            <Divider/>
            <ExpansionPanelDetails className={classes.details} style={{touchAction: 'none', msTouchAction: 'none'}}
            >
              <SimpleSlider noTitle={true} name='paginationStartTmp' params={sliderParams}
                            onSliderChange={this.onSliderChange}/>
            </ExpansionPanelDetails>
            <Divider/>
            <ExpansionPanelActions className={classes.actions}>
              <Fab variant='extended' color='inherit' className={classes.fab}
                   title={'Перейти к странице "Урок ' + paginationStartTmp + ' - ..."'}
                   onClick={this.onPageJump}>
                {'c ' + paginationStartTmp}
              </Fab>
              <BackwardForward currentClass={classes.columnMobile} onPrevClick={this.onPrevClick}
                               onNextClick={this.onNextClick} classes={classes}/>
            </ExpansionPanelActions>
          </ExpansionPanel>

          <Lessons
            lessons={lessons}
            currentLesson={currentLesson}
            classes={classes}
            onLessonChange={onLessonChange}
            expanded={!expanded}
            start={paginationStart}
            finish={paginationFinish}
          />
        </div>
        :
        <Typography variant='caption' className={classes.message}>Не выбран курс или нет уроков</Typography>
    );
  }
}

export default withStyles(styles)(BormoLessons);
