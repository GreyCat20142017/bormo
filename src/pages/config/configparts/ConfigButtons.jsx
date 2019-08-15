import React from 'react';
import Button from '@material-ui/core/Button';

export const ConfigButtons = ({classes, saveConfig, closeConfig}) => (
  <React.Fragment>
    <Button variant='contained' color='primary' onClick={saveConfig}
            className={classes.configButton}> Сохранить и закрыть </Button>
    <Button variant='contained' color='secondary' onClick={closeConfig}
            className={classes.configButton}> Отмена </Button>
  </React.Fragment>
);
