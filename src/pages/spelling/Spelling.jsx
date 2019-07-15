import React, {Component, Fragment} from 'react';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {BORMO_STATUS, LANGUAGES, TOOLBAR_TYPES} from '../../constants';
import {getSpellInitialState} from '../pagesCommon';
import SimpleToolbar from '../../components/toolbar/SimpleToolbar';
import bormoWrapper from '../../hoc/bormoWrapper';

import {styles} from './Spelling.css.js';


class Control extends Component {

  constructor(props) {
    super(props);
    this.state = getSpellInitialState(this.props);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps(nextProps) {
    this.setState((getSpellInitialState(nextProps)));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onTranslateChange = (evt) => {
    const value = evt.target.value;
    this.setState({translate: value});
  };

  onTranslateValidate = (evt) => {
    const {currentIndex, content, maxIndex, translate, errorCount, okCount} = this.state;
    evt.preventDefault();
    if (content[currentIndex][LANGUAGES.EN].trim() === translate.trim()) {
      this.bormoSpeaker.speak(translate);
      if (currentIndex === maxIndex) {
        this.setState({
          translate: '',
          timerStatus: BORMO_STATUS.STOPPED,
          currentIndex: 0,
          wasError: false,
          okCount: okCount + 1
        });
      } else {
        this.setState({
          translate: '',
          currentIndex: currentIndex < maxIndex ? currentIndex + 1 : 0,
          wasError: false,
          okCount: okCount + 1
        });
      }
    } else {
      this.setState({wasError: true, errorCount: errorCount + 1});
    }
  };

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
    const {currentIndex, content} = this.state;
    const newContent = [...content.filter((item, ind) => ind !== currentIndex), content[currentIndex]];
    this.setState({content: newContent});
  };

  onHint = () => {
    const {content, currentIndex, errorCount} = this.state;
    this.setState({translate: content[currentIndex].english, wasError: true, errorCount: errorCount + 1});
  };

  onRestart = () => {
    this.setState(getSpellInitialState(this.props));
  };


  render() {
    const {classes, currentLesson, currentCourse, contentMissingMessage} = this.props;
    const {content, currentIndex, maxIndex, errorCount, okCount, translate, timerStatus} = this.state;
    const currentTranslate = currentIndex <= maxIndex ? content[currentIndex][LANGUAGES.RU] : '';

    if (content.length > 0) {

      return (<React.Fragment>

        <div className={classes.wrapper}>

          <Badge className={classes.badge} color='primary' badgeContent={currentLesson}
                 title={'Курс: ' + currentCourse + ', урок: ' + currentLesson}>
            {currentCourse}
          </Badge>

          <Badge className={classes.badge} color='primary' badgeContent={errorCount}
                 title={'Количество ошибок: ' + errorCount}>
            <ErrorIcon fontSize='large' color='error'/>
          </Badge>

          <Badge className={classes.badge} color='primary' badgeContent={okCount}
                 title={'Количество правильно отмеченных: ' + okCount}>
            <CheckCircleIcon fontSize='large' color='disabled'/>
          </Badge>

        </div>

        <Paper className={classNames(classes.paper, classes.currentPaper, classes.currentWord)}>
          <Typography component='p' variant='h6' color='inherit' align='center'>
            {okCount === content.length ?
              'Урок "' + currentCourse + ' № ' + currentLesson + '" пройден ' + (errorCount > 0 ? '. Число ошибок: ' + errorCount : '...') :
              currentTranslate}
          </Typography>
        </Paper>

        <form className={classes.form} onSubmit={this.onTranslateValidate}>
          {(timerStatus === BORMO_STATUS.STARTED) ?
            <Fragment>
              <TextField
                required
                autoFocus={true}
                id='translate'
                label={translate !== currentTranslate && translate !== '' ? 'Ошибка' : 'Перевод:'}
                value={translate}
                fullWidth
                margin='normal'
                onChange={this.onTranslateChange}
              />
              <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STARTED} className={classes.toolbar} onSkip={this.onSkip}
                             onHint={this.onHint}/>
            </Fragment>
            :
            <SimpleToolbar toolbar={TOOLBAR_TYPES.SPELLING_STOPPED} className={classes.toolbar}
                           onRestart={this.onRestart}/>
          }

        </form>


      </React.Fragment>);

    } else {
      return (<div className='message'> {contentMissingMessage} </div>);
    }
  }
}

export default withStyles(styles)(bormoWrapper(Control));
