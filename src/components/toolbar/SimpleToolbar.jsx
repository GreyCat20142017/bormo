import React from 'react';
import {Paper, IconButton, withStyles} from '@material-ui/core';
import {WrapText, Replay, Done, InsertComment, Settings, SettingsBackupRestore as Discard} from '@material-ui/icons';

import {TOOLBAR_TYPES} from '../../constants.js';

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
      <WrapText/>
    </IconButton>
    <IconButton aria-label='Подсказка' onClick={props.onHint} title='Подсказка (Alt+H) - Hint'>
      <InsertComment/>
    </IconButton>
  </Paper>
);

const SpellingStopped = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Повторить' onClick={props.onRestart} title='Повторить сначала (Alt+R) - Repeat'>
      <Replay/>
    </IconButton>
  </Paper>
);

const PhrasesToolbar = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Проверить' onClick={props.onCheckCorrectness} title='Проверить (Alt+E) - Error checking'>
      <Done/>
    </IconButton>
    <IconButton aria-label='Подсказка' onClick={props.onHint} title='Подсказка (Alt+H) - Hint'>
      <InsertComment/>
    </IconButton>
    <IconButton aria-label='Сбросить' onClick={props.onCancel} title='Сбросить (Alt+D) - Discard current)'>
      <Discard/>
    </IconButton>
    <IconButton aria-label='Переключение клавиатура-мышь' onClick={props.onSwitchMouseKeyboard}
                title='Переключение между мышиным и клавиатурным режимами (Alt+K) - Keyboard'>
      <Settings/>
    </IconButton>
    <IconButton aria-label='Повторить' onClick={props.onRestart}
                title='Повторить сначала (Alt+R) - Repeat'>
      <Replay/>
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
