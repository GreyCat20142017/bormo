import React, {Component} from 'react';
import {debounce} from 'lodash';

import {withStyles} from '@material-ui/core/styles';

import {ListPart} from './ListPart';
import {TopPart} from './TopPart';
import bormoWrapper from '../../hoc/bormoWrapper';
import {getCurrentInfo, getModeInitialState, getTranslateLanguage} from '../pagesCommon';
import {BORMO_STATUS, DEBOUNCE_INTERVAL, DELAY_TIMEOUT, FIELDS, LANGUAGES, WORDS_PER_LESSON} from '../../constants';

import {styles} from './Control.css.js';

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

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (evt) => {
    const charCode = String.fromCharCode(evt.which).toLowerCase();
    if (evt.altKey) {
      switch (charCode) {
        case 's':
        case 'ы': {
          evt.preventDefault();
          this.onSkip();
          break;
        }
        case 'h':
        case 'р': {
          evt.preventDefault();
          this.onHint();
          break;
        }
        default:
      }
    }
  };

  onSkip = () => {
    const {randomOrder, currentIndex} = this.state;
    const index = currentIndex;
    const newRandom = [
      ...randomOrder.slice(0, index),
      ...randomOrder.slice(index + 1),
      randomOrder[index]
    ];
    this.setState({randomOrder: newRandom});
  };

  onHint = () => {
    this.setState(() => {
      this.setState({showHint: true, errorCount: this.state.errorCount + 1});
    }, this.hideHint());
  };

  hideHint = () => {
    setTimeout(() => this.setState({showHint: false}), DELAY_TIMEOUT);
  };

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
    const {content, currentIndex, maxIndex, memorized, randomOrder, errorCount, okCount, showHint} = this.state;
    const currentTranslate = showHint ?
      getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.ORIGIN) :
      getCurrentInfo(currentIndex, maxIndex, randomOrder, controlMode, content, FIELDS.TRANSLATE);

    return (content.length > 0) ?
      <React.Fragment>

        <TopPart classes={classes} content={content} currentCourse={currentCourse} currentLesson={currentLesson}
                 okCount={okCount} errorCount={errorCount} currentTranslate={currentTranslate} isHint={showHint}/>

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
