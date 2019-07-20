import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import WrapTextIcon from '@material-ui/icons/WrapText';
import ReplayIcon from '@material-ui/icons/Replay';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsBackIcon from '@material-ui/icons/SettingsBackupRestore';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

import {TOOLBAR_TYPES} from '../../constants.js';

import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  }
});

const SpellingStarted = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Пропустить' onClick={props.onSkip} title='Пропустить (Alt+S) - Skip'>
      <WrapTextIcon/>
    </IconButton>
    <IconButton aria-label='Подсказка' onClick={props.onHint} title='Подсказка (Alt+H) - Hint'>
      <InsertCommentIcon/>
    </IconButton>
  </Paper>
);

const SpellingStopped = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Повторить' onClick={props.onRestart} title='Повторить сначала (Alt+R) - Repeat'>
      <ReplayIcon/>
    </IconButton>
  </Paper>
);


const PhrasesToolbar = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Проверить' onClick={props.onCheckCorrectness} title='Проверить (Alt+E) - Error checking'>
      <DoneIcon/>
    </IconButton>
    <IconButton aria-label='Подсказка' onClick={props.onHint} title='Подсказка (Alt+H) - Hint'>
      <InsertCommentIcon/>
    </IconButton>
    <IconButton aria-label='Сбросить' onClick={props.onCancel} title='Сбросить (Alt+S) - reSet current)'>
      <SettingsBackIcon/>
    </IconButton>
    <IconButton aria-label='Переключение клавиатура-мышь' onClick={props.onSwitchMouseKeyboard}
                title='Переключение между мышиным и клавиатурным режимами (Alt+K) - Keyboard'>
      <SettingsIcon/>
    </IconButton>
    <IconButton aria-label='Повторить' onClick={props.onRestart}
                title='Повторить сначала (Alt+R) - Repeat'>
      <ReplayIcon/>
    </IconButton>
  </Paper>
);

const SimpleToolbar = (props) => {
  switch (props.toolbar) {
    case TOOLBAR_TYPES.SPELLING_STARTED:
      return <SpellingStarted {...props}/>;

    case TOOLBAR_TYPES.SPELLING_STOPPED:
      return <SpellingStopped {...props}/>;

    case TOOLBAR_TYPES.PHRASES:
      return <PhrasesToolbar {...props}/>;
    default:
      return null;
  }
};


export default withStyles(styles)(SimpleToolbar);
