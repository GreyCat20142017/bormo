import React, {Component, Fragment} from 'react';

import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import SimpleToolbar from '../../components/toolbar/SimpleToolbar';
import {KEY_CODES, TOOLBAR_TYPES} from '../../constants';
import {isValidIndex, getSortedWords} from '../../functions';
import ContentMissingMessage from '../../components/ContentMissingMessage';
import bormoWrapper from '../../hoc/bormoWrapper';

import {styles} from './Phrases.css.js';

const getChangedAmount = (wordsContent, wordsAmount, result, operand) => {
  const words = result.split(' ').map(item => item.toLowerCase());
  words.forEach((word, ind) => {
    let index = wordsContent.indexOf(word.trim().toLowerCase());
    if (index !== -1) {
      wordsAmount[index] = wordsAmount[index] + operand;
    }
  });
  return wordsAmount;
};

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
  Array.isArray(dataArray) ? dataArray[currentIndex].russian : 'Ошибка: не удалось получить данные');

const getObjectValuesByKeyArray = (sourceObject, keysArray) => (
  keysArray.map(key => sourceObject.hasOwnProperty(key) ? sourceObject[key] : 0)
);

const getPhrasesInitialState = ({content, currentSection}) => {
  const wordsObject = dataTransform(content);
  const shuffledWords = getSortedWords(Object.keys(wordsObject));
  return ({
    wordsContent: shuffledWords,
    wordsAmount: getObjectValuesByKeyArray(wordsObject, shuffledWords),
    currentIndex: 0,
    data: content,
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
    this.state = getPhrasesInitialState(props);
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getPhrasesInitialState(nextProps));
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
        default:
      }
    } else if (evt.keyCode === KEY_CODES.ENTER && !this.state.keyboardMode) {
      this.onCheckCorrectness(evt, true);
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
    const {currentIndex, data, errorCount, result, keyboardMode, wordsAmount, wordsContent} = this.state;
    if (!keyboardMode && result.trim() !== '') {
      const newAmount = getChangedAmount(wordsContent, wordsAmount, result, +1);
      this.setState(() => ({wordsAmount: newAmount}));
    }
    this.setState({
      result: data[currentIndex].english,
      errorCount: errorCount + 1
    });
  };

  onCheckCorrectness = (evt, wasHint = false) => {
    const {currentIndex, data, result, okCount, errorCount, keyboardMode, wordsAmount, wordsContent} = this.state;
    evt.preventDefault();

    if (data[currentIndex].english.toLowerCase().trim() === result.toLowerCase().trim()) {

      const nextIndex = isValidIndex(currentIndex + 1, data) ? currentIndex + 1 : 0;
      const newAmount = (keyboardMode || wasHint) ? getChangedAmount(wordsContent, wordsAmount, result, -1) : wordsAmount;
      this.bormoSpeaker.speak(data[currentIndex].english);
      this.setState({
        currentIndex: nextIndex,
        result: '',
        okCount: okCount + 1,
        wasError: false,
        wordsAmount: newAmount
      });
      console.log(okCount, newAmount, this.props.config.instantNextMode);
      if (this.props.config.instantNextMode && (newAmount.filter(item => item !== 0).length === 0)) {
        this.props.onNextClick();
      }
    } else {
      const newAmount = (keyboardMode || wasHint) ? wordsAmount : getChangedAmount(wordsContent, wordsAmount, result, +1);
      this.setState({
        errorCount: errorCount + 1,
        wasError: true,
        result: keyboardMode ? result : '',
        wordsAmount: newAmount
      });
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
    this.setState(getPhrasesInitialState(this.props));
  };

  onSwitchMouseKeyboard = () => {
    const {result, keyboardMode, wordsAmount, wordsContent} = this.state;
    const newAmount = !keyboardMode ? getChangedAmount(wordsContent, wordsAmount, result, +1) : wordsAmount;
    this.setState({keyboardMode: !this.state.keyboardMode, result: '', wordsAmount: newAmount});
  };

  onTranslateChange = (evt) => {
    const value = evt.target.value;
    this.setState({result: value});
  };

  render() {
    const {wordsContent, wordsAmount, currentIndex, data, result, keyboardMode, wasError, okCount, errorCount} = this.state;
    const {classes} = this.props;
    const isFinished = (okCount === data.length);

    if (data.length > 0) {
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
              {isFinished ?
                `Статистика. Всего фраз: ${okCount} , число ошибок: ${errorCount}` :
                getTranslatedPhrase(data, currentIndex)
              }
            </Typography>
          </Paper>

          <Paper className={classes.paper}>
            {keyboardMode ?
              <form className={classes.form} onSubmit={this.onCheckCorrectness}>
                <TextField
                  required
                  autoFocus={true}
                  id='result'
                  label={wasError ? 'Нужно исправить ошибку:' : 'Перевод:'}
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
    } else {
      return <ContentMissingMessage/>;
    }
  }
}

export default withStyles(styles)(bormoWrapper(Phrases));

