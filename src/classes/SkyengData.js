class SkyengData {
  constructor(skyData) {
    const data = skyData && Array.isArray(skyData) ? skyData : [];
    const [first, ...phrases] = data && Array.isArray(data) ? data : [[], []];
    const meanings = first.meanings;
    const ok = data && Array.isArray(data) && Array.isArray(meanings) && meanings.length > 0 && first && meanings[0];

    this._basicInfo = ok ? {
      id: first.id,
      text: first.text,
      partOfSpeech: meanings[0] ? meanings[0].partOfSpeechCode : '',
      transcription: meanings[0] ? meanings[0].transcription : '',
      soundUrl: meanings[0] ? meanings[0].soundUrl : ''
    } : null;

    this._meanings = ok ? meanings.map((
      item => ({
        id: item.id,
        partOfSpeech: item.partOfSpeechCode,
        translationText: item.translation.text,
        translationNote: item.translation.note
      })
    )) : [];

    this._phrases = ok ? phrases.map((
      item => (item.meanings.length > 0 ? {
        id: item.id,
        text: item.text,
        partOfSpeech: item.meanings[0].partOfSpeechCode,
        translationText: item.meanings[0].translation.text,
        translationNote: item.meanings[0].translation.note,
        transcription: item.meanings[0].transcription,
        soundUrl: item.meanings[0].soundUrl
      } : {})
    )).filter(item => item.text.indexOf(this._basicInfo.text) !== -1) : [];

    this._ok = ok;
  }

  get basicInfo() {
    return this._basicInfo;
  }

  get meanings() {
    return this._meanings;
  }

  get phrases() {
    return this._phrases;
  }

  get status() {
    return this._ok;
  }
}

export default SkyengData;
