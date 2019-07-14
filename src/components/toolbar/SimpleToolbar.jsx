import React from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import WrapTextIcon from '@material-ui/icons/WrapText';
import InsertCommentIcon from '@material-ui/icons/InsertComment';

import {TOOLBAR_TYPES} from '../../constants.js'

import {withStyles} from '@material-ui/core/styles/index';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    width: '120px'
  }
});

const SpellingStarted = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Пропустить' onClick={props.onSkip} title='Пропустить (Alt+S) - Skip'>
      <WrapTextIcon/>
    </IconButton>
    <IconButton aria-label='Подсказка' onClick={props.onHint} title='Подсказка  (Alt+H) - Hint'>
      <InsertCommentIcon/>
    </IconButton>
  </Paper>
);

const SpellingStopped = (props) => (
  <Paper className={props.classes.toolbar}>
    <IconButton aria-label='Пропустить' onClick={props.onRestart} title='Повторить сначала (Alt+R) - Repeat'>
      <WrapTextIcon/>
    </IconButton>
  </Paper>
);


const SimpleToolbar = (props) => {
  switch (props.toolbar) {
    case TOOLBAR_TYPES.SPELLING_STARTED:
      return <SpellingStarted {...props}/>;

    case TOOLBAR_TYPES.SPELLING_STOPPED:
      return <SpellingStopped {...props}/>;
    default:
      return null;
  }
};


export default withStyles(styles)(SimpleToolbar);
