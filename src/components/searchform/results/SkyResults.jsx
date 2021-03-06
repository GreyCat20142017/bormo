import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import SkyResultTabs from './SkyResultTabs';
import SkyengData from '../../../classes/SkyengData';

const audio = new Audio();

const playSound = (url) => {
  if (url) {
    try {
      audio.src = url;
      audio.play();
    } catch (e) {
    }
  }
};

const SkyResults = ({data, classes}) => {

  const sky = new SkyengData(data);

  if (sky.status) {
    return (
      <div className={classes.form}>
        <Paper className={classNames(classes.paperFlex, classes.paper)}>
          <Typography variant='h6'> Слово: {sky.basicInfo.text} [ {sky.basicInfo.transcription} ]</Typography>
          <ButtonBase className={classes.simpleButton}
                      onClick={() => playSound(sky.basicInfo.soundUrl)}><VolumeUpIcon/></ButtonBase>
        </Paper>
        <Paper className={classes.paper}>
          <SkyResultTabs skyData={sky}/>
        </Paper>
      </div>
    );
  } else {
    return <Typography variant='h6'>Ничего не найдено.</Typography>;
  }
};

export default SkyResults;
