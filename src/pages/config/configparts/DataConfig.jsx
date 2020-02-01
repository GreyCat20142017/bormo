import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import DataSourceSelector from '../../../components/DataSourceSelector';

export const DataConfig = ({classes, APIkey, testStatus, checkAPI, onOptionChange, onSelectDataSource}) => (
  <React.Fragment>
    <Typography variant='caption' className={classes.configGroup}>Источник данных</Typography>
    <Paper className={classes.configPaper}>
      <FormGroup className={classes.configGroup}>
        <div className={classes.flex}>
          <Button size='small' variant='contained' color='secondary' onClick={checkAPI}
                  className={classes.configButton}>
            Тест API
            <ImportExportIcon className={classes.rightIcon} fontSize='small'/>
          </Button>
          <DataSourceSelector onSelectDataSource={onSelectDataSource} current={APIkey}/>
        </div>
        <Typography variant='body2' color='primary' className={classes.text}>Статус: {testStatus}</Typography>
      </FormGroup>
    </Paper>
  </React.Fragment>
);
