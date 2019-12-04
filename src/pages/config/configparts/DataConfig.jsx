import React from 'react';
import {Typography, Paper, FormGroup, Button} from '@material-ui/core';
import {ImportExport} from '@material-ui/icons';

import DataSourceSelector from '../../../components/DataSourceSelector';

export const DataConfig = ({classes, APIkey, testStatus, checkAPI, onOptionChange, onSelectDataSource}) => (
  <>
    <Typography variant='caption' className={classes.configGroup}>Источник данных</Typography>
    <Paper className={classes.configPaper}>
      <FormGroup className={classes.configGroup}>
        <div className={classes.flex}>
          <Button size='small' variant='contained' color='secondary' onClick={checkAPI}
                  className={classes.configButton}>
            Тест API
            <ImportExport className={classes.rightIcon} fontSize='small'/>
          </Button>
          <DataSourceSelector onSelectDataSource={onSelectDataSource} current={APIkey}/>
        </div>
        <Typography variant='body2' color='primary' className={classes.text}>Статус: {testStatus}</Typography>
      </FormGroup>
    </Paper>
  </>
);
