import React, {Component, Fragment} from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {isValidIndex, shuffleArray} from '../../functions';
import {styles} from './Phrases.css.js';
import data from './phrases';
import Badge from '@material-ui/core/Badge';

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
  const wordsObject = dataTransform(data);
  const shuffledWords = shuffleArray(Object.keys(wordsObject));
  return ({
    wordsContent: shuffledWords,
    wordsAmount: getObjectValuesByKeyArray(wordsObject, shuffledWords),
    currentIndex: 0,
    data: data,
    result: '',
    errorCount: 0,
    okCount: 0,
    wasError: false
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

  onWordClick = (index) => {
    const {wordsContent, wordsAmount, result} = this.state;
    if (wordsAmount[index] > 0) {
      const newAmounts = wordsAmount.map((item, ind) => (ind === index ? item - 1 : item));
      const newResult = result + ' ' + wordsContent[index];
      this.setState({
        wordsAmount: newAmounts,
        result: newResult
      });
    }
  };

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
        wordsAmount[index]++
      }
    });
    this.setState({result: '', wordsAmount: wordsAmount});
  };

  render() {
    const {wordsContent, wordsAmount, currentIndex, data, result} = this.state;
    const {classes} = this.props;
    return (
      <Fragment>
        <ul className={classes.wrapper}>
          {wordsContent.map((item, ind) =>
            (
              <li key={ind}>

                <Fragment>
                  <Badge className={classes.badge} color='secondary' badgeContent={wordsAmount[ind]}>
                    <span></span>
                  </Badge>

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
          <Typography variant='h5' className={classes.typo}>
            {result ? result : '?'}
          </Typography>
        </Paper>
        <div className={classes.buttonWrapper}>
          <Button variant='contained' color='secondary' className={classes.button} onClick={this.onCheckCorrectness}>
            Проверить
          </Button>
          <Button variant='contained' color='secondary' className={classes.button} onClick={this.onCancel}>
            Сбросить
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Phrases);

