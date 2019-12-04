import React from 'react';
import {Typography, Paper} from '@material-ui/core';

import BormoThemeSelect from '../../../components/BormoThemeSelect';

export const ColorConfig = ({classes, currentTheme, themes, onThemeSelect}) => (
  <>
    <Typography variant='caption' className={classes.configGroup}>Цветовая тема (параметр применяется при
      выборе)</Typography>
    <Paper className={classes.configPaper}>
      <BormoThemeSelect onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}
                        fromConfig={true}/>
    </Paper>
  </>
);
