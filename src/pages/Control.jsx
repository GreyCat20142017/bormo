import React, {Component} from 'react';

import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {styles} from './Control.css.js';
import {isInactive, getActiveAmount, getInitialMemorized, getRandomOrder, shuffleArray} from './pagesCommon';

import {WORDS_PER_LESSON, BORMO_STATUS} from '../constants';

const getTranslate = (reverse) => (reverse ?  'english' : 'russian');

const getOrigin = (reverse) => (reverse ? 'russian' :  'english');

const getControlInitialState = (props) => ({
  currentIndex: 0,
  maxIndex: props.content.length - 1,
  timerStatus: BORMO_STATUS.STARTED,
  memorized: getInitialMemorized(props.content.length),
  randomOrder: getRandomOrder(props.content.length),
  content: shuffleArray(props.content),
  errorCount: 0,
  okCount: 0
});

const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne, reverse}) => (

  <ul className={classes.cardList}>
    {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
      <li className={classes.cardItem} key={ind + startIndex}>
        <Paper
          className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>

          <Typography className={classes.title} variant='h6'
                      color='secondary'
                      onClick={() => switchDisableOne(ind + startIndex)}>
            {item[getOrigin(reverse)]}
          </Typography>

        </Paper>
      </li>
    )}
  </ul>
);

class Control extends Component {

  constructor(props) {
    super(props);
    this.state = getControlInitialState(this.props);
    this.bormoSpeaker = this.props.bormoSpeaker;    
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getControlInitialState(nextProps));
  }

  switchDisableOne = (index) => {
    const {content, reverse} = this.props;
    const {memorized, timerStatus, currentIndex, maxIndex, randomOrder, errorCount, okCount} = this.state;

    if (timerStatus === BORMO_STATUS.STARTED && content[index][getTranslate(reverse)] === content[randomOrder[currentIndex]][getTranslate(reverse)]) {
      const newMemorized = [...memorized.slice(0, index), {
        index: index,
        inactive: !memorized[index].inactive
      }, ...memorized.slice(index + 1)];
      if (currentIndex < maxIndex) {
        this.setState({memorized: newMemorized, currentIndex: currentIndex + 1, okCount: okCount + 1});
      } else {
        this.setState({memorized: newMemorized, timerStatus: BORMO_STATUS.STOPPED, okCount: okCount + 1});
      }
    } else {
      this.setState({errorCount: errorCount + 1});
    }
  }

  render() {
    const {classes, currentLesson, currentCourse, contentMissingMessage, reverse} = this.props;
    const {content, currentIndex, maxIndex, memorized, randomOrder, errorCount, okCount} = this.state;
    const currentTranslate = (currentIndex >= 0 && randomOrder[currentIndex] <= maxIndex && randomOrder[currentIndex] >= 0) ?
      content[randomOrder[currentIndex]][getTranslate(reverse)] : '';
    const activeAmount = getActiveAmount(memorized);


    if (content.length > 0) {

      return (<React.Fragment>

        <div className={classes.wrapper}>

          <Badge className={classes.badge} color="primary" badgeContent={currentLesson}
                 title={'Курс: ' + currentCourse + ', урок: ' + currentLesson}>
            {currentCourse}
          </Badge>

          <Paper className={classNames(classes.paper, classes.currentPaper, classes.currentWord)}>
            <Typography component='p' variant='h6' color='inherit' align='center'>
              {activeAmount === 0 ?
                'Все слова этого урока отмечены правильно'+  (errorCount > 0 ? ', но число ошибок: ' +  errorCount : '...'):
                currentTranslate}
            </Typography>
          </Paper>

          <Badge className={classes.badge} color='primary' badgeContent={errorCount}
            title={'Количество ошибок: ' + errorCount}>
            <ErrorIcon fontSize='large' color='error'/>
          </Badge>

          <Badge className={classes.badge} color='primary' badgeContent={okCount}
                 title={'Количество правильно отмеченных: ' + okCount}>
            <CheckCircleIcon fontSize='large' color='disabled'/>
          </Badge>

        </div>


        <div className={classes.parts}>
          <div className={classNames(classes.part)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                      memorized={memorized} switchDisableOne={this.switchDisableOne} reverse={reverse}/>
          </div>

          <div className={classNames(classes.part)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                      switchDisableOne={this.switchDisableOne} reverse={reverse}/>
          </div>

        </div>

      </React.Fragment>)

    } else {
      return contentMissingMessage;
    }
  }
}

export default withStyles(styles)(Control);
