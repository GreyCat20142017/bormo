import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DataSourceSelector from '../components/DataSourceSelector';
import BormoFooter from '../components/footer/BormoFooter';
import {ROUTES, SWITCHABLE_ROUTES} from '../routes';
import {getStatusText} from '../functions';


const StatusNotBormo = ({classes, statusText, currentRoute}) => (
  // currentRoute === ROUTES.PHRASES ? <Typography variant='caption' color='secondary' classes>{statusText}</Typography> : null
  <Typography variant='caption' color='secondary' className={classes.status}>{statusText}</Typography>
);

export const AppFooter = ({
                            classes, isNotBormo, currentTheme, currentRoute, currentCourse, currentLesson, themes,
                            onSelectDataSource, onThemeSelect, onSearchClick,
                            onPreviousClick, onNextClick, onRestartClick
                          }) => {
  const hideFooter = SWITCHABLE_ROUTES.filter(item => item !== ROUTES.MAIN).indexOf(currentRoute) !== -1;
  return (
    <React.Fragment>
      {hideFooter || isNotBormo ?
        <React.Fragment>
          <StatusNotBormo classes={classes} currentRote={currentRoute}
                          statusText={getStatusText(currentRoute, currentCourse, currentLesson)}/>
          <DataSourceSelector onSelectDataSource={onSelectDataSource} fixed={true}/>
        </React.Fragment> :
        <Paper className={classes.paperFooter}>
          <BormoFooter onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}
                       statusText={getStatusText(currentRoute, currentCourse, currentLesson)}
                       onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                       onRestartClick={onRestartClick} onSearchClick={onSearchClick}
                       onSelectDataSource={onSelectDataSource}/>

        </Paper>
      }
    </React.Fragment>
  );
};
