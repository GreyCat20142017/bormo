import React, {Component, Fragment} from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {isValidIndex, getSortedWords} from '../../functions';
import {styles} from './Phrases.css.js';
import data from './phrases';
import Badge from '@material-ui/core/Badge';
import {TOOLBAR_TYPES, KEY_CODES} from '../../constants';
import TextField from '@material-ui/core/TextField';
import SimpleToolbar from '../../components/toolbar/SimpleToolbar';

const dataTransform = (data) => {
  const wordsPresence = {};
  data.forEach((el) => {
    const wordsArray = el.english.trim().toLowerCase().split(' ');
    wordsArray.forEach((word) => {
      wordsPresence[word] = (wordsPresence.hasOwnProperty(word)) ? wordsPresence[word] + 1 : 1;
    });
  });
  return wordsPresence;
};

const getTranslatedPhrase = (dataArray, currentIndex) => (
  Array.isArray(data) ? dataArray[currentIndex].russian : 'Ошибка: не удалось получить данные');

const getObjectValuesByKeyArray = (sourceObject, keysArray) => (
  keysArray.map(key => sourceObject.hasOwnProperty(key) ? sourceObject[key] : 0)
);

const getPhrasesInitialState = (data) => {
  const wordsObject = dataTransform(data.filter((item) => item.section_id === 1));
  const shuffledWords = getSortedWords(Object.keys(wordsObject));
  return ({
    wordsContent: shuffledWords,
    wordsAmount: getObjectValuesByKeyArray(wordsObject, shuffledWords),
    currentIndex: 0,
    data: data,
    result: '',
    errorCount: 0,
    okCount: 0,
    wasError: false,
    keyboardMode: true
  });
};

class Phrases extends Component {

  constructor(props) {
    super(props);
    this.state = getPhrasesInitialState(data);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getPhrasesInitialState(data));
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (evt) => {
    const charCode = String.fromCharCode(evt.which).toLowerCase();
    if (evt.altKey) {
      switch (charCode) {
        case 'e':
        case 'у': {
          evt.preventDefault();
          this.onCheckCorrectness();
          break;
        }
        case 's':
        case 'ы': {
          evt.preventDefault();
          this.onCancel();
          break;
        }
        case 'h':
        case 'р': {
          evt.preventDefault();
          this.onHint();
          break;
        }
        case 'k':
        case 'л': {
          evt.preventDefault();
          this.onSwitchMouseKeyboard();
          break;
        }
        case 'r':
        case 'к': {
          evt.preventDefault();
          this.onRestart();
          break;
        }
        default:
      }
    }
    if (evt.keyCode === KEY_CODES.ENTER) {
      evt.preventDefault();
      this.onCheckCorrectness();
    }
  };

  onWordClick = (index) => {
    const {wordsContent, wordsAmount, result, keyboardMode} = this.state;
    if (!keyboardMode && wordsAmount[index] > 0) {
      const newAmounts = wordsAmount.map((item, ind) => (ind === index ? item - 1 : item));
      const newResult = result + ' ' + wordsContent[index];
      this.setState({
        wordsAmount: newAmounts,
        result: newResult
      });
    }
  };

  onHint = () => {
    const {currentIndex, data, errorCount} = this.state;
    this.setState({
      result: data[currentIndex].english,
      errorCount: errorCount + 1
    });
  }

  onCheckCorrectness = () => {
    const {currentIndex, data, result, okCount, errorCount} = this.state;
      if (data[currentIndex].english.toLowerCase().trim() === result.toLowerCase().trim()) {
        const nextIndex = isValidIndex(currentIndex + 1, data) ? currentIndex + 1 : 0;
        this.setState({currentIndex: nextIndex, result: '', okCount: okCount + 1, wasError: false});
      } else {
        this.setState({errorCount: errorCount + 1, wasError: true});
      }
  };

  onCancel = () => {
    const {wordsContent, wordsAmount, result} = this.state;
    const wordsToReturn = result.trim().split(' ');
    wordsToReturn.forEach(word => {
      let index = wordsContent.indexOf(word.trim());
      if (index !== -1) {
        wordsAmount[index]++;
      }
    });
    this.setState({result: '', wordsAmount: wordsAmount});
  };

  onRestart = () => {
    //todo  Это временно. data заменить на...
    this.setState(getPhrasesInitialState(data));
  }

  onSwitchMouseKeyboard = () => {
    if (this.state.keyboardMode) {
    //todo Пересчитать WordsAmount
    }
    this.setState({keyboardMode: !this.state.keyboardMode});
  }

  onTranslateChange = (evt) => {
    const value = evt.target.value;
    this.setState({result: value});
  };

  render() {
    const {wordsContent, wordsAmount, currentIndex, data, result, keyboardMode} = this.state;
    const {classes} = this.props;
    return (
      <Fragment>
        <ul className={classes.wrapper}>
          {wordsContent.map((item, ind) =>
            (
              <li key={ind}>

                <Fragment>
                  {keyboardMode ? null :
                    <Badge className={classes.badge} color='secondary' badgeContent={wordsAmount[ind]}>
                      <span></span>
                    </Badge>
                  }
                  <Button key={ind} variant='contained' color='primary' className={classes.button}
                          disabled={(!isValidIndex(ind, wordsAmount) || wordsAmount[ind] <= 0)}
                          onClick={() => this.onWordClick(ind)}>
                    {item}
                  </Button>
                </Fragment>

              </li>
            ))}
        </ul>
        <Paper className={classes.paper}>
          <Typography variant='h5' className={classes.typo}>
            {getTranslatedPhrase(data, currentIndex)}
          </Typography>
        </Paper>

        <Paper className={classes.paper}>
          {keyboardMode ?
            <form className={classes.form} onSubmit={this.onCheckCorrectness}>
              <TextField
                required
                autoFocus={true}
                id='result'
                label={'Перевод:'}
                value={result}
                fullWidth
                margin='normal'
                onChange={this.onTranslateChange}
              />
            </form>
            :
            <Typography variant='h5' className={classes.typo}>
              {result ? result : '?'}
            </Typography>
          }
        </Paper>

        <SimpleToolbar toolbar={TOOLBAR_TYPES.PHRASES} className={classes.toolbar}
                       onRestart={this.onRestart} onSwitchMouseKeyboard={this.onSwitchMouseKeyboard}
                       onCheckCorrectness={this.onCheckCorrectness} onCancel={this.onCancel}/>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Phrases);

