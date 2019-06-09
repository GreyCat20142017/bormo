import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {WORDS_PER_LESSON, BORMO_STATUS} from '../constants';

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
  partDesktopOnly : {
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
  }
});


const ListPart = ({content, classes, currentIndex, startIndex}) => (
  <ul className={classes.cardList}>
    {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
      <li className={classes.cardItem} key={ind + startIndex}>
        <Paper className={classes.card}>
          <Typography className={classes.title} variant='h6'
                      color={(ind + startIndex) === currentIndex ? 'error' : 'textSecondary'}
                      title={item.russian}>
            {item.english}
          </Typography>

        </Paper>
      </li>
    )
    }
  </ul>);


class Bormo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0,
      maxIndex: this.props.content.length - 1,
      timerStatus: BORMO_STATUS.STOPPED,
      interval: null
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
    });
    this.interval = null;
  }


  ticks () {
    this.setState((state) => {
      const {currentIndex, maxIndex} = state;
      const nextIndex = ((currentIndex + 1) <= maxIndex) ? currentIndex + 1 : 0;
      this.bormoSpeaker.speak(this.props.content[nextIndex].english);
      return ({
        currentIndex: nextIndex,
      });
    });
  }

  timerStart = () => {
    const currentIndex = this.state.currentIndex;
    clearInterval(this.interval);
    this.interval = setInterval(this.ticks, TIMER_INTERVAL);
    if (currentIndex >= 0 && currentIndex < this.props.content.length) {
      this.bormoSpeaker.speak(this.props.content[currentIndex].english);
    }
    this.setState({currentIndex: this.state.currentIndex, timerStatus: BORMO_STATUS.STARTED});
  }

  timerPause = () => {
    clearInterval(this.interval);
    this.setState({timerStatus: BORMO_STATUS.PAUSED});
  }

  timerStop = () => {
    clearInterval(this.interval);
    this.setState({currentIndex: 0, timerStatus: BORMO_STATUS.STOPPED});
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    const {content, classes} = this.props;
    const {currentIndex, maxIndex} = this.state;
    const currentWord = (currentIndex <= maxIndex && currentIndex >= 0) ? content[currentIndex].english : '';
    const currentTranslate = (currentIndex <= maxIndex && currentIndex >= 0) ? content[currentIndex].russian : '';

    return (
      <div className='bormo__wrapper'>
        <div className={classes.parts}>
          <div className={classNames(classes.part, classes.partDesktopOnly)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}/>
          </div>

          <div className={classes.part}>
            {content.length > 0 ?
              <div className={classes.currentWord}>
                <Paper className={classes.paper}>
                  <Typography component="h5" variant="h5" color="error">
                    {currentWord}
                  </Typography>
                </Paper>
                <Paper className={classes.paper}>
                  <Typography component="h5" variant="h5">
                    {currentTranslate}
                  </Typography>
                </Paper>


                <div className={classes.controls}>
                  <IconButton aria-label="Старт" className={classes.margin} onClick={this.timerStart}>
                    <PlayArrowIcon/>
                  </IconButton>
                  <IconButton aria-label="Пауза" className={classes.margin} onClick={this.timerPause}>
                    <PauseIcon/>
                  </IconButton>
                  <IconButton aria-label="Стоп" className={classes.margin} onClick={this.timerStop}>
                    <StopIcon/>
                  </IconButton>
                </div>
                <Typography component="p" variant="body2">
                  {'' + (currentIndex + 1) + ' из '+ (maxIndex+1)}
                </Typography>

              </div>
              : null
            }
          </div>


          <div className={classNames(classes.part, classes.partDesktopOnly)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={Math.floor(WORDS_PER_LESSON / 2)}/>
          </div>

        </div>

      </div>
    );
  }
}

export default withStyles(styles)(Bormo);
