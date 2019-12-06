import React from 'react';
import classNames from 'classnames';
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions} from '@material-ui/core';
import {Divider, Fab, Typography, IconButton, withStyles} from '@material-ui/core';
import {ArrowBack, ArrowForward, ExpandMore} from '@material-ui/icons';

import BormoLesson from './BormoLesson';
import SimpleSlider from '../SimpleSlider';
import {PAGE_LIMIT} from '../../constants';
import {styles} from './BormoLessons.css';

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
  );
};

const BackwardForward = ({currentClass, onPrevClick, onNextClick, classes}) => (
  <ExpansionPanelActions className={classes.actions}>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу назад'
                  onClick={onPrevClick}>
        <ArrowBack/>
      </IconButton>
    </div>
    <div className={currentClass}>
      <IconButton color='secondary' size='small' title='Пролистать список уроков на страницу вперед'
                  onClick={onNextClick}>
        <ArrowForward/>
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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
  };

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
  };

  onPrevClick = (evt) => {
    evt.stopPropagation();
    const prev = getPrevTo(getSpecifiedStart(this.state), 1, PAGE_LIMIT);
    this.props.onLessonChange(prev);
    this.setState({
      paginationStart: prev,
      paginationStartTmp: prev,
      paginationFinish: getPositionTo(prev, this.state.paginationTo, PAGE_LIMIT)
    });
  };

  onNextClick = (evt) => {
    evt.stopPropagation();
    const next = getNextTo(getSpecifiedStart(this.state), this.state.paginationTo, PAGE_LIMIT);
    this.props.onLessonChange(next);
    this.setState({
      paginationStart: next,
      paginationStartTmp: next,
      paginationFinish: getPositionTo(next, this.state.paginationTo, PAGE_LIMIT)
    });
  };

  render() {
    const {classes, lessons, currentLesson, onLessonChange, lastLesson} = this.props;
    const {expanded, paginationStart, paginationFinish, paginationStartTmp} = this.state;
    const sliderParams = {
      default: currentLesson || paginationStartTmp,
      min: 1,
      max: lastLesson,
      step: 1,
      title: ''
    };
    return (lastLesson ?
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded} onChange={this.onPanelSwitch}>
            <ExpansionPanelSummary expanded={expanded} expandIcon={<ExpandMore/>}>

              <BackwardForward currentClass={classes.column} onPrevClick={this.onPrevClick}
                               onNextClick={this.onNextClick} classes={classes}/>

            </ExpansionPanelSummary>
            <Divider/>
            <ExpansionPanelDetails className={classes.details} style={{
              touchAction: 'none',
              msTouchAction: 'none'
            }}
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
