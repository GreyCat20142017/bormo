import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export const CommonConfig = ({classes, instantStart, instantNextMode, countErrorAtPrompt, onOptionChange}) => (
  <React.Fragment>
    <Typography variant='caption' className={classes.configGroup}>Общие параметры</Typography>
    <Paper className={classes.configPaper}>
      <FormGroup className={classes.configGroup}>
        <FormControlLabel
          control={
            <Switch checked={instantStart}
                    onChange={onOptionChange('instantStart')}
                    value='instantStart'
                    color='primary'/>
          }
          label='начинать выполнение выбранного режима без ожидания нажатия кнопки Старт'/>
        <FormControlLabel
          control={
            <Switch
              checked={instantNextMode}
              onChange={onOptionChange('instantNextMode')}
              value='instantNextMode'
              color='primary'/>
          }
          label='начинать выполнение следующего режима после окончания текущего'/>
        <FormControlLabel
          control={
            <Switch
              checked={countErrorAtPrompt}
              onChange={onOptionChange('countErrorAtPrompt')}
              value='countErrorAtPrompt'
              color='primary'
              disabled={true}/>
          }
          label='увеличивать счетчик ошибок при запросе подсказки'/>
      </FormGroup>
    </Paper>
  </React.Fragment>
);
