import React from 'react';
import {Button} from '@material-ui/core';

export const ConfigButtons = ({classes, saveConfig, closeConfig}) => (
  <>
    <Button variant='contained' color='primary' onClick={saveConfig}
            className={classes.configButton}> Сохранить и закрыть </Button>
    <Button variant='contained' color='secondary' onClick={closeConfig}
            className={classes.configButton}> Отмена </Button>
  </>
);
