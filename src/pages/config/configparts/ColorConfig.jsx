import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import BormoThemeSelect from '../../../components/BormoThemeSelect';

export const ColorConfig = ({classes, currentTheme, themes, onThemeSelect}) => (
  <React.Fragment>
    <Typography variant='caption' className={classes.configGroup}>Цветовая тема (параметр применяется при
      выборе)</Typography>
    <Paper className={classes.configPaper}>
      <BormoThemeSelect onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}
                        fromConfig={true}/>
    </Paper>
  </React.Fragment>
);
