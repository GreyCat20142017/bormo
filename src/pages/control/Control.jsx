import React, {Component} from 'react';
import {debounce} from 'lodash';

import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import bormoWrapper from '../../hoc/bormoWrapper';
import {styles} from './Control.css.js';

import {
  isInactive,
  getTranslateLanguage,
  getModeInitialState,
  getCurrentInfo
} from '../pagesCommon';

import {WORDS_PER_LESSON, BORMO_STATUS, DEBOUNCE_INTERVAL, FIELDS, LANGUAGES} from '../../constants';

const TopPart = ({classes, content, currentCourse, currentLesson, okCount, errorCount, currentTranslate}) => (
  <div className={classes.wrapper}>

    <Badge className={classes.badge} color="primary" badgeContent={currentLesson}
           title={'Курс: ' + currentCourse + ', урок: ' + currentLesson}>
      {currentCourse}
    </Badge>

    <Paper className={classNames(classes.paper, classes.currentPaper, classes.currentWord)}>
      <Typography className={classes.currentWordContent} component='p' variant='h6' color='inherit' align='center'
                  title={okCount === content.length ? 'Alt+N-ext, Alt+P-revious, Alt+R-estart' : currentTranslate}>
        {okCount === content.length ?
          'Урок "' + currentCourse + ' № ' + currentLesson + '" пройден. Число ошибок: ' + errorCount :
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
);

const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne, controlMode}) => (
  <div className={classNames(classes.part)}>
    <ul className={classes.cardList}>
      {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
        <li className={classes.cardItem} key={ind + startIndex}>
          <Paper
            className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>
            <Typography className={classes.title} variant='h6'
                        color='secondary'
                        onClick={() => switchDisableOne(ind + startIndex)} title={item[FIELDS.ORIGIN]}>
              {item[FIELDS.ORIGIN]}
            </Typography>
          </Paper>
        </li>
      )}
    </ul>
  </div>
);

class Control extends Component {

  constructor(props) {
    super(props);
    this.state = getModeInitialState(this.props);
    this.bormoSpeaker = this.props.bormoSpeaker;
    this.onDebouncedSwitch = debounce(this.onDebouncedSwitch.bind(this), DEBOUNCE_INTERVAL);
  }

  onDebouncedSwitch(index) {
    this.switchDisableOne(index);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getModeInitialState(nextProps));
  }

  switchDisableOne = (index) => {
    const {controlMode} = this.props;
    const {content, memorized, timerStatus, currentIndex, maxIndex, randomOrder, errorCount, okCount} = this.state;

    if (timerStatus === BORMO_STATUS.STARTED &&
      content[index][getTranslateLanguage(controlMode)] === content[randomOrder[currentIndex]][getTranslateLanguage(controlMode)]) {
      this.speakCurrent(currentIndex, maxIndex, randomOrder, controlMode, content);
      const newMemorized = [...memorized.slice(0, index), {
        index: index,
        inactive: !memorized[index].inactive
      }, ...memorized.slice(index + 1)];
      if (currentIndex < maxIndex) {
        this.setState({memorized: newMemorized, currentIndex: currentIndex + 1, okCount: okCount + 1, wasError: false});
      } else {
        this.setState({
          memorized: newMemorized,
          timerStatus: BORMO_STATUS.STOPPED,
          okCount: okCount + 1,
          wasError: false
        });
        if (this.props.config.instantNextMode) {
          this.props.moveOn();
        }
      }
    } else {
      this.setState({errorCount: errorCount + 1, wasError: true});
      this.speakError();
    }
  };

  speakError = () => (this.bormoSpeaker.speak('Not right.'));

  speakCurrent = (currentIndex, maxIndex, randomOrder, controlMode, content) => {
    const {timerStatus} = this.state;
    if (timerStatus === BORMO_STATUS.STARTED) {
      let originLanguage = getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.ORIGIN_LANGUAGE);
      const text = getCurrentInfo(currentIndex, maxIndex, randomOrder, true, content,
        originLanguage === LANGUAGES.RU ? FIELDS.TRANSLATE : FIELDS.ORIGIN);
      this.bormoSpeaker.speak(text);
    }
  };

  render() {
    const {classes, currentLesson, currentCourse, controlMode} = this.props;
    const {content, currentIndex, maxIndex, memorized, randomOrder, errorCount, okCount} = this.state;
    const currentTranslate = getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.TRANSLATE);

    return (content.length > 0) ?
      <React.Fragment>

        <TopPart classes={classes} content={content} currentCourse={currentCourse} currentLesson={currentLesson}
                 okCount={okCount} errorCount={errorCount} currentTranslate={currentTranslate}/>

        <div className={classes.parts}>
          <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                    memorized={memorized} switchDisableOne={this.onDebouncedSwitch} controlMode={controlMode}/>

          <ListPart content={content} classes={classes} currentIndex={currentIndex}
                    startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                    switchDisableOne={this.onDebouncedSwitch} controlMode={controlMode}/>
        </div>

      </React.Fragment> :
      null;
  }
}

export default withStyles(styles)(bormoWrapper(Control));
