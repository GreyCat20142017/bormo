import React from 'react';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import {withStyles} from '@material-ui/core/styles';

import {DataConfig} from './configparts/DataConfig';
import {CommonConfig} from './configparts/CommonConfig';
import {SoundConfig} from './configparts/SoundConfig';
import {ColorConfig} from './configparts/ColorConfig';
import {ConfigButtons} from './configparts/ConfigButtons';

import {
  API_BRANCHES,
  DATA_SOURCES,
  STATUS_OK,
  TEST_KEY,
  TEST_STATUSES,
  VOICE_TEST_PHRASE,
  voiceParams
} from '../../constants';
import {getRound} from '../../functions';
import {styles} from './BormoConfig.css.js';

const getConfigState = (props, currentVoice) => ({
  ...props.config, ...props.voiceConfig, soundMuted: props.soundMuted, onlyEnglish: props.onlyEnglish,
  APIkey: props.APIkey, currentVoice: currentVoice, testStatus: TEST_STATUSES.UNKNOWN
});

class BormoConfig extends React.Component {

  constructor(props) {
    super(props);
    this.voices = window.speechSynthesis.getVoices().filter((item) => item.lang.slice(0, 2) === 'en');
    this.bormoSpeaker = this.props.bormoSpeaker;
    const currentVoice = this.bormoSpeaker.speaker ? this.bormoSpeaker.speaker.voice.name : '';
    this.state = getConfigState(props, currentVoice);
  }

  componentWillReceiveProps(nextProps) {
    this.bormoSpeaker = nextProps.bormoSpeaker;
    this.voices = window.speechSynthesis.getVoices().filter((item) => item.lang.slice(0, 2) === 'en');
    const currentVoice = this.bormoSpeaker.speaker ? this.bormoSpeaker.speaker.voice.name : '';
    this.setState(getConfigState(nextProps, currentVoice));
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
        });
        this.setState({currentVoice: currentVoice});
      }
    }
  };

  onSelectDataSource = (sourceKey) => {
    this.setState({APIkey: sourceKey, testStatus: TEST_STATUSES.UNKNOWN});
  };

  checkAPI = async () => {
    let {APIkey} = this.state;
    let apiURL = DATA_SOURCES[APIkey];
    let result = [];
    let res = [];
    let useAPIData = (APIkey !== TEST_KEY);
    this.setState(() => ({isLoading: true}));
    if (useAPIData && apiURL) {
      try {
        res = await axios.get(apiURL[API_BRANCHES.TEST], {});
        result = res && (res.status === STATUS_OK) ? res.data.content : [];
      } catch (err) {
        result = TEST_STATUSES.ERROR;
      }
    }
    if (!useAPIData) {
      result = TEST_STATUSES.TEST_DATA;
    }
    this.setState({testStatus: result});
  };

  saveConfig = () => {
    const {
      instantStart, instantNextMode, countErrorAtPrompt,
      APIkey, soundMuted
    } = this.state;
    const changedConfig = {config: {instantStart, instantNextMode, countErrorAtPrompt}, APIkey, soundMuted};
    this.props.onConfigChange(Object.assign({}, changedConfig));
  };

  render() {

    const {isConfigOpen, classes, currentTheme, themes, onThemeSelect, closeConfig} = this.props;
    const {
      instantStart, instantNextMode, countErrorAtPrompt, currentVoice,
      onlyEnglish, pitch, volume, soundMuted, APIkey, testStatus
    } = this.state;

    console.log(onlyEnglish? ' true' : 'false');

    if (isConfigOpen) {
      return (
        <Dialog
          fullScreen
          open={isConfigOpen}>

          <div className={classes.configWrapper}>
            <AppBar position="fixed" color="secondary" className={classes.bar}>
              <Typography variant='h5' className={classes.configGroup}>Настройка приложения</Typography>
            </AppBar>

            <CommonConfig classes={classes} instantStart={instantStart} instantNextMode={instantNextMode}
                          countErrorAtPrompt={countErrorAtPrompt} onOptionChange={this.onOptionChange}/>

            <DataConfig classes={classes} APIkey={APIkey} testStatus={testStatus}
                        checkAPI={this.checkAPI} onOptionChange={this.onOptionChange}
                        onSelectDataSource={this.onSelectDataSource}/>

            <SoundConfig classes={classes} onlyEnglish={onlyEnglish} soundMuted={soundMuted} volume={volume}
                         voiceParams={voiceParams} pitch={pitch} currentVoice={currentVoice}
                         onOptionChange={this.onOptionChange} onSliderChange={this.onSliderChange}
                         onVoiceChange={this.onVoiceChange} checkVoice={this.checkVoice}
                         bormoSpeaker={this.bormoSpeaker} voices={this.voices}/>

            <ColorConfig classes={classes} currentTheme={currentTheme} themes={themes}
                         onThemeSelect={onThemeSelect}/>

            <ConfigButtons classes={classes} saveConfig={this.saveConfig} closeConfig={closeConfig}/>

          </div>
        </Dialog>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(BormoConfig);



