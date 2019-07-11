import React, {Component} from 'react';
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';

import {BORMO_STATUS, LANGUAGES} from "../../constants";
import {getSpellInitialState} from "../pagesCommon";

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

  onTranslateChange = (evt) => {
    const value = evt.target.value;
    this.setState({translate: value});
  }

  onTranslateValidate = (evt) => {

    evt.preventDefault();
    const {currentIndex, content, maxIndex, translate, errorCount, okCount} = this.state;
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
  }


  render() {
    const {classes, currentLesson, currentCourse, contentMissingMessage} = this.props;
    const {content, currentIndex, maxIndex, errorCount, okCount, translate} = this.state;
    const currentTranslate = currentIndex <= maxIndex ? content[currentIndex][LANGUAGES.RU] : '';

    if (content.length > 0) {

      return (<React.Fragment>

        <div className={classes.wrapper}>

          <Badge className={classes.badge} color="primary" badgeContent={currentLesson}
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
          <TextField
            required
            id='translate'
            label={translate !== currentTranslate && translate !== '' ? 'Ошибка' : 'Перевод:'}
            value={translate}
            fullWidth
            margin='normal'
            onChange={this.onTranslateChange}
          />
        </form>

      </React.Fragment>)

    } else {
      return (<div className="message"> {contentMissingMessage} </div>);
    }
  }
}

export default withStyles(styles)(Control);
