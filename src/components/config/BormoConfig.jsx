import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import classNames from 'classnames';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';

import {withStyles} from '@material-ui/core/styles';

import SimpleSlider from '../SimpleSlider'
import BormoThemeSelect from '../BormoThemeSelect';
import {voiceParams, VOICE_TEST_PHRASE} from '../../constants';
import {getRound} from '../../functions';

import {styles} from './BormoConfig.css.js';

class BormoConfig extends React.Component {

  constructor (props) {
    super(props);
    this.voices = window.speechSynthesis.getVoices().filter((item) => item.lang.slice(0, 2) === 'en');
    this.bormoSpeaker = this.props.bormoSpeaker;
    const currentVoice = this.bormoSpeaker.speaker ? this.bormoSpeaker.speaker.voice.name : '';
    this.state = {...props.config, ...props.voiceConfig, soundMuted: props.soundMuted, currentVoice: currentVoice};
  }

  componentWillReceiveProps (nextProps) {
    this.bormoSpeaker = nextProps.bormoSpeaker;
    this.voices = window.speechSynthesis.getVoices().filter((item) => item.lang.slice(0, 2) === 'en');
    const currentVoice = this.bormoSpeaker.speaker ? this.bormoSpeaker.speaker.voice.name : ''
    this.setState({ ...nextProps.voiceConfig, currentVoice: currentVoice});
  }

  onOptionChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  onSliderChange = (name, value) => {
    const newValue = getRound(value, 1);
    if (typeof this.bormoSpeaker.speaker.ssu[name] !== 'undefined') {
      this.bormoSpeaker.speaker.ssu[name] = newValue;
    }
    this.setState({[name]: newValue});
  };

  onInputChange = name => evt => {
    this.setState({
      [name]: evt.target.value,
    });
  };

  checkVoice = () => {
    this.bormoSpeaker.speak(VOICE_TEST_PHRASE);
  };

  onVoiceChange = (evt) => {
    const currentVoice = evt.target.value;
    if (this.voices.length > 0 && currentVoice) {
      const voice = this.voices.find((item) => item.name === currentVoice);
      if (voice) {
        const {volume, pitch, rate} = this.state;
        this.bormoSpeaker.setAnotherVoice(voice, {
          volume: volume,
          pitch: pitch,
          rate: rate
        })
        this.setState({currentVoice: currentVoice});
      }
    }
  }

  checkAPI = () => {

  };

  render () {

    const {isConfigOpen, classes, onThemeSelect, currentTheme, themes} = this.props;
    const {
      instantStart, instantNextMode, countErrorAtPrompt,
      onlyEnglish, pitch, volume, soundMuted, useAPIData, apiURL, currentVoice
    } = this.state;

    if (isConfigOpen) {
      return (
        <Dialog
          fullScreen
          open={isConfigOpen}
        >

          <div className={classes.configWrapper}>
            <Typography variant='h5' className={classes.configGroup}>Настройка приложения</Typography>
            <Typography variant='caption' className={classes.configGroup}>Общие параметры</Typography>
            <Paper className={classes.configPaper}>
              <FormGroup className={classes.configGroup}>
                <FormControlLabel
                  control={
                    <Switch checked={instantStart}
                            onChange={this.onOptionChange('instantStart')}
                            value='instantStart'
                            color='primary'
                    />
                  }
                  label='начинать выполнение выбранного режима без ожидания нажатия кнопки Старт'
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={instantNextMode}
                      onChange={this.onOptionChange('instantNextMode')}
                      value='instantNextMode'
                      color='primary'
                    />
                  }
                  label='начинать выполнение следующего режима после окончания текущего'
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={countErrorAtPrompt}
                      onChange={this.onOptionChange('countErrorAtPrompt')}
                      value='countErrorAtPrompt'
                      color='primary'
                    />
                  }
                  label='увеличивать счетчик ошибок при запросе подсказки'
                />
              </FormGroup>
            </Paper>

            <Typography variant='caption' className={classes.configGroup}>Адрес API</Typography>
            <Paper className={classes.configPaper}>
              <FormGroup className={classes.configGroup}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useAPIData}
                      onChange={this.onOptionChange('useAPIData')}
                      value='useAPIData'
                      color='primary'
                    />
                  }
                  label='использовать данные с удаленного сервера'
                />
                <TextField
                  id="outlined-dense"
                  label="адрес (например, http://localhost:3338/)"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  value={apiURL}
                  onChange={this.onInputChange('apiURL')}
                  variant="outlined"
                />

              </FormGroup>
              <Button size='small' variant='contained' color='secondary' onClick={this.checkAPI}
                      className={classes.configButton}>
                Тест API
                <ImportExportIcon className={classes.rightIcon} fontSize='small'/>
              </Button>
            </Paper>

            <Typography variant='caption' className={classes.configGroup}>Параметры звука</Typography>
            <Paper className={classes.configPaper}>
              <FormGroup className={classes.configGroup}>
                <Typography variant="subtitle1">{this.bormoSpeaker.getVoiceSupport()}</Typography>
                <FormControlLabel
                  control={<Switch checked={onlyEnglish} onChange={this.onOptionChange('onlyEnglish')}
                                   value='onlyEnglish' color='primary' disabled={true}/>}
                  label='при доступности синтеза речи озвучивать только английский'
                />

                <FormControlLabel
                  control={<Switch checked={soundMuted} onChange={this.onOptionChange('soundMuted')} value='soundMuted'
                                   color='primary'/>}
                  label='беззвучный режим'
                />
                <SimpleSlider name='volume' params={voiceParams.volume} value={volume}
                              onSliderChange={this.onSliderChange}/>
                <Typography variant='caption' className={classes.configGroup}>Чем больше значение параметра "Высота",
                  тем выше звук: </Typography>
                <SimpleSlider name='pitch' params={voiceParams.pitch} value={pitch}
                              onSliderChange={this.onSliderChange}/>

              </FormGroup>
              <Button size='small' variant='contained' color='secondary' onClick={this.checkVoice}
                      className={classes.configButton}>
                Тест звука
                <VolumeUpIcon className={classes.rightIcon} fontSize='small'/>
              </Button>
              <Select
                value={currentVoice}
                onChange={this.onVoiceChange}
                inputProps={{
                  name: 'choice'
                }}
                title='Выбор синтезатора речи'
              >
                {this.voices.length === 0 ? null : this.voices.map(el =>
                  <MenuItem className={classes.item} value={el.name} key={el.name}
                            title={el.name}>{el.name}</MenuItem>
                )}
              </Select>
            </Paper>

            <Typography variant='caption' className={classes.configGroup}>Цветовая тема (параметр применяется при
              выборе)</Typography>
            <Paper className={classes.configPaper}>
              <BormoThemeSelect onThemeSelect={onThemeSelect} currentTheme={currentTheme} themes={themes}
                                fromConfig={true}/>
            </Paper>


            <Button variant='contained' color='primary' onClick={this.props.closeConfig}
                    className={classes.configButton}> Сохранить и закрыть </Button>
            <Button variant='contained' color='secondary' onClick={this.props.closeConfig}
                    className={classes.configButton}> Отмена </Button>

          </div>
        </Dialog>)
    } else {
      return null
    }
  }
}

export default withStyles(styles)(BormoConfig);



