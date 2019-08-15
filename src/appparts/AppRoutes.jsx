import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Main from '../pages/main/Main';
import Bormo from '../pages/bormo/Bormo';
import Control from '../pages/control/Control';
import Spelling from '../pages/spelling/Spelling';
import Search from '../pages/search/Search';
import SkyengSearch from '../pages/sky/SkyengSearch';
import Phrases from '../pages/phrases/Phrases';
import BormoConfig from '../pages/config/BormoConfig';
import NotFound from '../pages/notfound/NotFound';
import {CONTROL_MODES} from '../constants';
import {ROUTES} from '../routes';

export const AppRoutes = ({
                            classes, currentCourse, currentLesson, content, config,
                            bormoSpeaker, onNextClick, onPreviousClick, onRestartClick, moveOn, ...rest
                          }) => (
  <main className={classes.content}>
    {rest.isLoading ?
      <Typography variant='caption'>Данные загружаются...</Typography> :

      <Switch>
        <Route exact path={ROUTES.MAIN} component={Main}/>
        <Route path={ROUTES.BORMO} render={() =>
          <Bormo content={content} bormoSpeaker={bormoSpeaker} currentLesson={currentLesson}
                 currentCourse={currentCourse} config={config}
                 onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                 onRestartClick={onRestartClick} moveOn={moveOn}/>
        }/>
        <Route path={ROUTES.CONTROL} render={() =>
          <Control content={content} bormoSpeaker={bormoSpeaker} currentLesson={currentLesson}
                   currentCourse={currentCourse} config={config} controlMode={CONTROL_MODES.CONTROL}
                   onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                   onRestartClick={onRestartClick} moveOn={moveOn}/>
        }/>
        <Route path={ROUTES.REVERSE} render={() =>
          <Control content={content} bormoSpeaker={bormoSpeaker} currentLesson={currentLesson}
                   currentCourse={currentCourse} config={config} controlMode={CONTROL_MODES.REVERSE}
                   onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                   onRestartClick={onRestartClick} moveOn={moveOn}/>
        }/>
        <Route path={ROUTES.SPELLING} render={() =>
          <Spelling content={content} bormoSpeaker={bormoSpeaker} currentLesson={currentLesson}
                    currentCourse={currentCourse} config={config}
                    reverse={true} onPreviousClick={onPreviousClick} onNextClick={onNextClick}
                    onRestartClick={onRestartClick} moveOn={moveOn}/>
        }/>
        <Route path={ROUTES.CHECK} render={() =>
          <Control content={content} bormoSpeaker={this.bormoSpeaker} currentLesson={currentLesson}
                   currentCourse={currentCourse} config={config}
                   controlMode={CONTROL_MODES.MIXED} onPreviousClick={onPreviousClick}
                   onNextClick={onNextClick}
                   onRestartClick={onRestartClick} moveOn={moveOn}/>
        }/>
        <Route path={ROUTES.SEARCH} render={() => <Search bormoSpeaker={bormoSpeaker} APIkey={rest.APIkey}/>}
        />
        <Route path={ROUTES.SKYENG} render={() => <SkyengSearch/>
        }/>
        <Route path={ROUTES.PHRASES} render={() =>
          <Phrases content={content} bormoSpeaker={bormoSpeaker} closePhrases={rest.closePhrases}
                   currentSection={currentLesson}/>
        }/>
        <Route path={ROUTES.CONFIG} render={() =>
          <BormoConfig
            currentTheme={rest.currentTheme}
            themes={rest.themes}
            config={rest.config}
            voiceConfig={rest.voiceConfig}
            soundMuted={rest.soundMuted}
            onlyEnglish={rest.onlyEnglish}
            APIkey={rest.APIkey}
            bormoSpeaker={bormoSpeaker}
            isConfigOpen={rest.isConfigOpen}
            closeConfig={rest.closeConfig}
            onConfigChange={rest.onConfigChange}
            onThemeSelect={rest.onThemeSelect}/>
        }/>
        <Route component={NotFound}/>
      </Switch>
    }
  </main>);
