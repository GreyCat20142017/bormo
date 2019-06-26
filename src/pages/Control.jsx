import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {styles} from './Control.css.js';
import {isInactive, getActiveAmount, getInitialMemorized, getRandomOrder, shuffleArray} from './pagesCommon';

import {WORDS_PER_LESSON, BORMO_STATUS} from '../constants';


const ListPart = ({content, classes, currentIndex, startIndex, memorized, switchDisableOne}) => (

    <ul className={classes.cardList}>
      {content.slice(startIndex, startIndex + Math.floor(WORDS_PER_LESSON / 2)).map((item, ind) =>
        <li className={classes.cardItem} key={ind + startIndex}>
          <Paper
            className={classNames(classes.card, isInactive(ind + startIndex, memorized) ? classes.colorized : null)}>

              <Typography className={classes.title} variant='h6'
                          color='secondary'
                          onClick={() => switchDisableOne(ind + startIndex)}>
                {item.english}
              </Typography>

          </Paper>
        </li>
      )}
    </ul>
  );


class Control extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      maxIndex: this.props.content.length - 1,
      timerStatus: BORMO_STATUS.STARTED,
      memorized: getInitialMemorized(this.props.content.length),
      randomOrder: getRandomOrder(this.props.content.length),
      content: shuffleArray(this.props.content)
    };
    this.bormoSpeaker = this.props.bormoSpeaker;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentIndex: 0,
      maxIndex: nextProps.content.length - 1,
      timerStatus: BORMO_STATUS.STARTED,
      memorized: getInitialMemorized(nextProps.content.length),
      randomOrder: getRandomOrder(nextProps.content.length),
      content: shuffleArray(nextProps.content)
    });
  }


  switchDisableOne = (index) => {
    const content = this.props.content;
    const {memorized, timerStatus, currentIndex, maxIndex, randomOrder} = this.state;
    if (timerStatus === BORMO_STATUS.STARTED && content[index].russian === content[randomOrder[currentIndex]].russian) {
      const newMemorized = [...memorized.slice(0, index), {
        index: index,
        inactive: !memorized[index].inactive
      }, ...memorized.slice(index + 1)];
      if (currentIndex < maxIndex) {
        this.setState({memorized: newMemorized, currentIndex: currentIndex + 1});
      } else {
        this.setState({memorized: newMemorized, timerStatus: BORMO_STATUS.STOPPED});
      }
    }
  }


  render() {
    const {classes, currentLesson, currentCourse, contentMissingMessage} = this.props;
    const {content, currentIndex, maxIndex, memorized, randomOrder} = this.state;
    const currentTranslate = (currentIndex >= 0 && randomOrder[currentIndex] <= maxIndex && randomOrder[currentIndex] >= 0) ?
      content[randomOrder[currentIndex]].russian : '';
    const activeAmount = getActiveAmount(memorized);


    if (content.length > 0) {

      return (<React.Fragment>


        <div className={classes.currentWord}>
          <Paper className={classNames(classes.paper, classes.currentPaper)}>
            <Typography component='p' variant='h5' color='inherit' align='center'>
              {activeAmount === 0 ? 'Все слова этого урока отмечены правильно...' : currentTranslate}
            </Typography>
          </Paper>
        </div>


        <div className={classes.parts}>
          <div className={classNames(classes.part)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex} startIndex={0}
                      memorized={memorized} switchDisableOne={this.switchDisableOne}/>
          </div>

          <div className={classNames(classes.part)}>
            <ListPart content={content} classes={classes} currentIndex={currentIndex}
                      startIndex={Math.floor(WORDS_PER_LESSON / 2)} memorized={memorized}
                      switchDisableOne={this.switchDisableOne}/>
          </div>

        </div>

      </React.Fragment>)

    } else {
      return contentMissingMessage;
    }
  }
}

export default withStyles(styles)(Control);
