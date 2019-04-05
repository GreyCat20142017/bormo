import {PREFFERABLE_VOICE} from "./constants";

class SpeakerVoice {
  constructor (muteValue, params = {volume: 1, rate: 1.2, pitch: 1}) {
    this.supportSound = 'speechSynthesis' in window;
    this.supportEnglish = false;
    this.speaker = null;
    this.speakerMuted = muteValue;
    this.params = params;
  }

  getVoiceList = async (cb) => {
    const tmp = window.speechSynthesis.getVoices();
    return cb(tmp);
  }

  resetVoice = (voice) => {
    const ssu = new SpeechSynthesisUtterance('');
    ssu.voice = voice;
    ssu.volume = this.params.volume;
    ssu.rate = this.params.rate;
    ssu.pitch = this.params.pitch;
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

  setAnotherVoice = (newVoice, params) => {
    if (this.supportSound && newVoice && params) {
      this.params = Object.assign({}, params);
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
        ssu.rate = 0.9;
        ssu.pitch = 1;
        ssu.voice = voice;
      }
      ;
      if (text) {
        window.speechSynthesis.speak(ssu);
      }
      ;
    }
  }

  getVoiceSupport = () => {
    return 'Ваш браузер ' + (this.supportSound ? '' : ' НЕ ') + ' поддерживает синтез речи' +
      (this.supportEn ? '' : '. Синтез недоступен');
  }

}

export default SpeakerVoice