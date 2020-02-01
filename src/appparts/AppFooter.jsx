import React from 'react';
import Paper from '@material-ui/core/Paper';

import DataSourceSelector from '../components/DataSourceSelector';
import BormoFooter from '../components/footer/BormoFooter';
import StatusText from '../components/StatusText';
import {ROUTES, SWITCHABLE_ROUTES} from '../routes';
import {getStatusText} from '../functions';

export const AppFooter = ({
                            classes, isNotBormo, currentTheme, currentRoute, currentCourse, currentLesson, themes,
                            onSelectDataSource, onThemeSelect, onSearchClick,
                            onPreviousClick, onNextClick, onRestartClick, openModal, closeModal
                          }) => {
  const hideFooter = SWITCHABLE_ROUTES.filter(item => item !== ROUTES.MAIN).indexOf(currentRoute) !== -1;
  return (
    <>
      {hideFooter || isNotBormo ?
        <>
          <StatusText classes={classes}
                      statusText={getStatusText(currentRoute, currentCourse, currentLesson)}/>
          <DataSourceSelector onSelectDataSource={onSelectDataSource} fixed={true}/>
        </> :
        <Paper className={classes.paperFooter}>
          <BormoFooter onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}
                       statusText={getStatusText(currentRoute, currentCourse, currentLesson)}
                       onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                       onRestartClick={onRestartClick} onSearchClick={onSearchClick}
                       openModal={openModal} closeModal={closeModal}
                       onSelectDataSource={onSelectDataSource}/>

        </Paper>
      }
    </>
  );
};
