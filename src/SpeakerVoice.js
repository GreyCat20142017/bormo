import {PREFFERABLE_VOICE} from "./constants";


class SpeakerVoice {

  constructor (muteValue, params = {volume: 1, rate: 1, pitch: 1}) {
    this.supportSound = 'speechSynthesis' in window;
    this.supportEnglish = false;
    this.speaker = null;
    this.speakerMuted = muteValue;
    this.params = params;
  }

  resetParams = (ssu, params, voice = null) => {
    if (voice) {
      ssu.voice = voice;
    }
    ssu.volume = params.volume;
    ssu.rate = params.rate;
    ssu.pitch = params.pitch;
  };


  getVoiceList = async (cb) => {
    const tmp = window.speechSynthesis.getVoices();
    return cb(tmp);
  }

  resetVoice = (voice) => {
    const ssu = new SpeechSynthesisUtterance('');
    this.resetParams(ssu, this.params, voice);
    const language = voice.lang.slice(0, 2);
    this.supportEnglish = (language === 'en');
    this.speaker = {'ssu': ssu, 'voice': ssu.voice, 'lang': language};
  }

  setSpeaker = (voices) => {
    if (this.supportSound && this.speaker === null) {
      let voiceList = (voices && voices.length > 0) ? voices : window.speechSynthesis.getVoices();
      if (voiceList.length > 0) {
        let voiceEn = voiceList.find((item) => item.name.slice(0, PREFFERABLE_VOICE.length) === PREFFERABLE_VOICE);
        if (!voiceEn) {
          voiceEn = voiceList.find((item) => item.lang.slice(0, 2) === 'en');
        }
        const voice = voiceEn ? voiceEn : voiceList[0];
        this.resetVoice(voice);
      }
    }
  }

  setAnotherVoice = (newVoice, newParams) => {
    if (this.supportSound && newVoice && newParams) {
      this.params = Object.assign({}, newParams);
      this.resetVoice(newVoice);
    }
  }

  mute = (muteValue) => {
    this.speakerMuted = muteValue;
  }

  speak = (text) => {
    if (this.supportSound && this.supportEnglish && this.speaker && !this.speakerMuted) {
      let {ssu, voice} = this.speaker;

      ssu.text = text;
      if (window.navigator.userAgent.indexOf("Firefox") >= 0) {
        ssu = new SpeechSynthesisUtterance(text);
        this.resetParams(ssu, this.params, voice);
      }
      if (text) {
        window.speechSynthesis.speak(ssu);
      }
    }
  }

  getVoiceSupport = () => {
    return 'Браузер ' + (this.supportSound ? '' : ' НЕ ') + ' поддерживает синтез речи' +
      (this.supportEnglish ? '' : '. Синтез недоступен');
  }

}

export default SpeakerVoice
