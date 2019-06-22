import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {WORDS_PER_LESSON, BORMO_STATUS, KEYCODES} from '../constants';

const TIMER_INTERVAL = 3000;


const styles = theme => ({
  cardList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: '2.2%',
    paddingRight: '2.2%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  cardItem: {
    minWidth: '100%',
    margin: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      margin: '4px',
      minWidth: '90%'
    }
  },
  card: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      padding: '2px',
      marginTop: '0'
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  part: {
    width: '30%',
    textAlign: 'center',
    paddingLeft: '1%',
    paddingRight: '1%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      margin: 'auto'
    }
  },
  partDesktopOnly: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  parts: {
    display: 'flex',
    justifyContent: 'space-between',
    align: 'stretch'
  },
  currentWord: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '50px'
  },
  controls: {
    margin: '50px auto 10px auto',
    maxWidth: '200px',
    maxHeight: '50px',
    alignSelf: 'flex-end'
  },
  paper: {
    padding: '8px',
    margin: '8px',
    width: '100%',
    alignSelf: 'center'
  },
  colorized: {
    backgroundColor: 'rgb(232, 232, 232)'
  }

});

const isInactive = (index, stateArray) => {
  return stateArray[index].inactive;
};

const getActiveAmount = (stateArray) => (
  stateArray.reduce((amount, current) => {
    amount += (current.inactive ? 0 : 1);
    return amount;
  }, 0)
);

const ListPart = ({content, classes, currentIndex, startIndex, memorized}) => (
  <ul className={classes.cardList}>
    {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
      <li className={classes.cardItem} key={ind + startIndex}>
        <Paper className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>
          <Typography className={classes.title} variant='h6'
                      color={(ind + startIndex) === currentIndex ? 'error' : 'secondary'}
                      title={item.russian}>
            {item.english}
          </Typography>

        </Paper>
      </li>
    )
    }
  </ul>);

const getInitialMemorized = (length) => {
  return "?".repeat(length).split("").map((item, ind) => (({index: ind, inactive: false})))
};


class Bormo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0,
      maxIndex: this.props.content.length - 1,
      timerStatus: BORMO_STATUS.STOPPED,
      interval: null,
      memorized: getInitialMemorized(this.props.content.length)
    };

    this.ticks = this.ticks.bind(this);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps (nextProps) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({
      currentIndex: 0,
      maxIndex: nextProps.content.length - 1,
      timerStatus: BORMO_STATUS.STOPPED,
      memorized: getInitialMemorized(nextProps.content.length)
    });
    this.interval = null;
  }


  ticks () {
    this.setState((state) => {
      const {currentIndex, maxIndex, memorized} = state;
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

  disableCurrent = () => {
    const {currentIndex, memorized} = this.state;
    const newMemorized = [...memorized.slice(0, currentIndex), {
      index: currentIndex,
      inactive: true
    }, ...memorized.slice(currentIndex + 1)];
    this.setState({memorized: newMemorized});
  }

  onKeyPress = (evt) => {
    if (evt.keyCode === KEYCODES.ENTER || evt.keyCode === KEYCODES.TAB) {
      this.disableCurrent();
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  render () {
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
                      memorized={memorized}/>
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
                </div>
                <Typography component='p' variant='body2'>
                  {'' + currentCourse.toUpperCase() + ', урок ' + currentLesson + ' (' + (currentIndex + 1) + ' из ' + (maxIndex + 1) + ')'}
                </Typography>

                <Typography component='p' variant='caption'>
                  TAB или ENTER - отметить текущее слово как изученное
                </Typography>

              </div>
              : contentMissingMessage
            }
          </div>


          <div className={classNames(classes.part, classes.partDesktopOnly)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}/>
          </div>

        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Bormo);
