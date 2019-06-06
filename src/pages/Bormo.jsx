import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import {withStyles} from '@material-ui/core/styles';

const TIMER_INTERVAL = 1000;
const TIMER_STATUS = {started: 'started', stopped: 'stopped', paused: 'paused'};

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
    minWidth: '47%',
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
  }

});

const WordList = ({content, classes, currentIndex}) => (
  <ul className={classes.cardList}>
    {content.map((item, ind) =>
      <li className={classes.cardItem} key={ind}>
        <Paper className={classes.card}>

          <Typography className={classes.title} variant='h6' color={ind === currentIndex ? 'error' : 'textSecondary'}>
            {item.english}
          </Typography>

        </Paper>
      </li>
    )
    }
  </ul>
);

class Bormo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentIndex: 0, maxIndex: this.props.content.length - 1, timerStatus: TIMER_STATUS.stopped,
      alternation: 1
    };
    this.interval = null;
    this.ticks = this.ticks.bind(this);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps (nextProps) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({currentIndex: 0, maxIndex: nextProps.content.length - 1, timerStatus: TIMER_STATUS.stopped});
  }

  componentDidMount () {
    // this.interval = setInterval(this.getNext, TIMER_INTERVAL);
    // this.timerStatus = TIMER_STATUS.started;
  }


  ticks () {
    if (this.state.timerStatus === TIMER_STATUS.started) {
      const {currentIndex, maxIndex, alternation} = this.state;

      if (this.state.alternation % 3 === 0) {
        let nextIndex = ((currentIndex + 1) <= maxIndex) ? currentIndex + 1 : 0;
        this.setState({
          currentIndex: nextIndex, alternation: alternation + 1
        });
      } else if (this.state.alternation % 2 === 0) {
        this.setState({alternation: alternation + 1});
      } else {
        this.setState({alternation: alternation + 1});
        this.bormoSpeaker.speak(this.props.content[currentIndex].english);
      }
    }
  }

  timerStart = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.ticks, TIMER_INTERVAL);
    this.setState({currentIndex: 0, timerStatus: TIMER_STATUS.started, alternation: 1});
  }

  timerPause = () => {
    clearInterval(this.interval);
    this.setState({timerStatus: TIMER_STATUS.paused});
  }

  timerStop = () => {
    clearInterval(this.interval);
    this.setState({currentIndex: 0, timerStatus: TIMER_STATUS.stopped});
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    const {content, classes} = this.props;
    const {currentIndex, maxIndex} = this.state;
    const currentTranslate = (currentIndex <= maxIndex && currentIndex > 0) ? content[currentIndex].russian : '';
    return (
      <div className='bormo__wrapper'>
        <WordList content={content} classes={classes} currentIndex={currentIndex}/>
        {content.length > 0 ?
          <Card>
            <CardContent>
              <Typography variant="h6">
                {currentTranslate}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton className={classes.button} title='Старт' onClick={this.timerStart}>
                <PlayArrowIcon/>
              </IconButton>
              <IconButton className={classes.button} title='Пауза' onClick={this.timerPause}>
                <PauseIcon/>
              </IconButton>
              <IconButton className={classes.button} title='Стоп' onClick={this.timerStop}>
                <StopIcon/>
              </IconButton>
            </CardActions>
          </Card>
          : null
        }
      </div>
    );
  }
}

export default withStyles(styles)(Bormo);
