import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import DoneIcon from '@material-ui/icons/Done';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {styles} from './Bormo.css.js';
import {isInactive, getActiveAmount, getInitialMemorized} from './pagesCommon';
import {WORDS_PER_LESSON, BORMO_STATUS, KEYCODES} from '../constants';

const TIMER_INTERVAL = 3000;

const getBormoInitialState = (props) => ({
  currentIndex: 0,
  maxIndex: props.content.length - 1,
  timerStatus: BORMO_STATUS.STOPPED,
  memorized: getInitialMemorized(props.content.length)
});

const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne}) => (
  <ul className={classes.cardList}>
    {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
      <li className={classes.cardItem} key={ind + startIndex}>
        <Paper className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>
          <Tooltip title={'Перевод: "' + item.russian + '"'} className={classes.tooltip}>
            <Typography className={classes.title} variant='h6'
                        color={(ind + startIndex) === currentIndex ? 'error' : 'secondary'}
                        onClick={() => switchDisableOne(ind + startIndex)}>
              {item.english}
            </Typography>
          </Tooltip>
        </Paper>
      </li>
    )}
  </ul>);


class Bormo extends Component {

  constructor(props) {
    super(props);
    this.state = getBormoInitialState(this.props);
    this.ticks = this.ticks.bind(this);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps(nextProps) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState(getBormoInitialState(nextProps));
    this.interval = null;
  }


  ticks() {
    this.setState((state) => {
      const {currentIndex, memorized} = state;
      const before = memorized.filter((item) => (!item.inactive && item.index < currentIndex));
      const after = memorized.filter((item) => (!item.inactive && item.index > currentIndex));
      const active = [...after, ...before];
      if (active.length === 0) {
        return ({
          currentIndex: 0, timerStatus: BORMO_STATUS.STOPPED
        });
      } else {
        const nextIndex = active[0].index;
        this.bormoSpeaker.speak(this.props.content[nextIndex].english);
        return ({
          currentIndex: nextIndex,
        });
      }
    });
  }

  timerStart = () => {
    if (this.state.timerStatus !== BORMO_STATUS.STARTED) {
      const currentIndex = this.state.currentIndex;
      clearInterval(this.interval);
      this.interval = setInterval(this.ticks, TIMER_INTERVAL);
      if (currentIndex >= 0 && currentIndex < this.props.content.length) {
        this.bormoSpeaker.speak(this.props.content[currentIndex].english);
      }
      this.setState({
        currentIndex: this.state.currentIndex,
        timerStatus: BORMO_STATUS.STARTED,
        memorized: getInitialMemorized(this.props.content.length)
      });
    }
  }

  timerPause = () => {
    if (this.state.timerStatus === BORMO_STATUS.STARTED) {
      clearInterval(this.interval);
      this.setState({timerStatus: BORMO_STATUS.PAUSED});
    }
  }

  timerStop = () => {
    clearInterval(this.interval);
    this.setState({currentIndex: 0, timerStatus: BORMO_STATUS.STOPPED});
  }

  switchDisableCurrent = () => {
    this.switchDisableOne(this.state.currentIndex);
  }

  switchDisableOne = (index) => {
    const {memorized, timerStatus} = this.state;
    if (timerStatus === BORMO_STATUS.STARTED) {
      const newMemorized = [...memorized.slice(0, index), {
        index: index,
        inactive: !memorized[index].inactive
      }, ...memorized.slice(index + 1)];
      this.setState({memorized: newMemorized});
    }
  }

  onKeyPress = (evt) => {
    if ((evt.keyCode === KEYCODES.ENTER || evt.keyCode === KEYCODES.SPACE) &&
      !evt.target.hasAttribute('data-done')) {
      this.switchDisableCurrent();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  render() {
    const {content, classes, currentLesson, currentCourse, contentMissingMessage} = this.props;
    const {currentIndex, maxIndex, memorized} = this.state;
    const currentWord = (currentIndex <= maxIndex && currentIndex >= 0) ? content[currentIndex].english : '';
    const currentTranslate = (currentIndex <= maxIndex && currentIndex >= 0) ? content[currentIndex].russian : '';
    const activeAmount = getActiveAmount(memorized);

    return (
      <div className='bormo__wrapper'>
        <div className={classes.parts}>
          <div className={classNames(classes.part, classes.partDesktopOnly)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                      memorized={memorized} switchDisableOne={this.switchDisableOne}/>
          </div>

          <div className={classes.part}>
            {content.length > 0 ?

              <div className={classes.currentWord}>

                <Paper className={classes.paper}>
                  <Typography component='p' variant='h5' color='inherit'>
                    {activeAmount === 0 ? 'Все слова этого урока отмечены как изученные...' : currentWord}
                  </Typography>
                </Paper>
                <Paper className={classes.paper}>
                  <Typography component='p' variant='h5' color='inherit'>
                    {activeAmount === 0 ? 'Можно выбрать другой урок или повторить этот.' : currentTranslate}
                  </Typography>
                </Paper>

                <div className={classes.controls}>
                  <IconButton aria-label='Старт' className={classes.margin} onClick={this.timerStart} title="Старт">
                    <PlayArrowIcon/>
                  </IconButton>
                  <IconButton aria-label='Пауза' className={classes.margin} onClick={this.timerPause} title="Пауза">
                    <PauseIcon/>
                  </IconButton>
                  <IconButton aria-label='Стоп' className={classes.margin} onClick={this.timerStop} title="Стоп">
                    <StopIcon/>
                  </IconButton>

                  <IconButton aria-label='Отметить' className={classes.margin} onClick={this.switchDisableCurrent}
                              data-done="true" title="Отметить слово как изученное">
                    <DoneIcon/>
                  </IconButton>
                </div>
                <Typography component='p' variant='body2'>
                  {'' + currentCourse.toUpperCase() + ', урок ' + currentLesson + ' (' + (currentIndex + 1) + ' из ' + (maxIndex + 1) + ')'}
                </Typography>

                <Typography component='p' variant='caption'>
                  SPACE или ENTER - отметить текущее слово как изученное
                </Typography>

              </div>
              : contentMissingMessage
            }
          </div>


          <div className={classNames(classes.part, classes.partDesktopOnly)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                      switchDisableOne={this.switchDisableOne}/>
          </div>

        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Bormo);
