import React from 'react';
import {Typography, Paper, FormGroup, FormControlLabel, Switch} from '@material-ui/core';

export const CommonConfig = ({classes, instantStart, instantNextMode, countErrorAtPrompt, keyboardMode, onOptionChange}) => (
  <>
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
        <FormControlLabel
          control={
            <Switch checked={keyboardMode}
                    onChange={onOptionChange('keyboardMode')}
                    value='keyboardMode'
                    color='primary'/>
          }
          label='в режиме Фразы использовать по умолчанию клавиатурный режим'/>
      </FormGroup>
    </Paper>
  </>
);
