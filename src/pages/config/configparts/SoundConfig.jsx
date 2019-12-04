import React from 'react';
import {Typography, Paper, FormGroup, FormControlLabel, Switch, Button, Select, MenuItem} from '@material-ui/core';
import {VolumeUp} from '@material-ui/icons';

import SimpleSlider from '../../../components/SimpleSlider';

export const SoundConfig = ({
                              classes, onlyEnglish, soundMuted, volume, voiceParams, pitch, currentVoice,
                              onOptionChange, onSliderChange, onVoiceChange, checkVoice, bormoSpeaker, voices
                            }) => (
  <React.Fragment>
    <Typography variant='caption' className={classes.configGroup}>Параметры звука</Typography>
    <Paper className={classes.configPaper}>
      <FormGroup className={classes.configGroup}>
        <Typography variant="subtitle1">{bormoSpeaker.getVoiceSupport()}</Typography>
        <div className={classes.flex}>

          <FormControlLabel
            control={<Switch checked={soundMuted} onChange={onOptionChange('soundMuted')} value='soundMuted'
                             color='primary'/>}
            label='беззвучный режим'/>

          <FormControlLabel
            control={<Switch checked={onlyEnglish} onChange={onOptionChange('onlyEnglish')}
                             value='onlyEnglish' color='primary' disabled={true}/>}
            label='озвучивать только английский'/>
        </div>

        <SimpleSlider name='volume' params={voiceParams.volume} value={volume}
                      onSliderChange={onSliderChange}/>
        <Typography variant='caption' className={classes.configGroup}>Чем больше значение параметра, тем писклявей звук.
          Норма: 1 </Typography>
        <SimpleSlider name='pitch' params={voiceParams.pitch} value={pitch}
                      onSliderChange={onSliderChange}/>

      </FormGroup>

      <Button size='small' variant='contained' color='secondary' onClick={checkVoice}
              className={classes.configButton}>
        Тест звука
        <VolumeUp className={classes.rightIcon} fontSize='small'/>
      </Button>

      <Select
        value={currentVoice}
        onChange={onVoiceChange}
        inputProps={{
          name: 'choice'
        }}
        title='Выбор синтезатора речи'>
        {voices.length === 0 ? null : voices.map(el =>
          <MenuItem className={classes.item} value={el.name} key={el.name}
                    title={el.name}>{el.name}</MenuItem>
        )}
      </Select>
    </Paper>
  </React.Fragment>
);
