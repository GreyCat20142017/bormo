export const drawerWidth = 180;

export const voiceParams = {
  volume: {default: 1, min: 0, max: 1, step: 0.1, title: 'Громкость'},
  rate: {default: 1, min: 0.1, max: 10, step: 0.1, title: 'Скорость'},
  pitch: {default: 1, min: 0, max: 2, step: 0.1, title: 'Высота звука'}
};

export const PREFFERABLE_VOICE = 'Google UK English';

export const DATA_PATH = 'data/bormo.json'
export const COURSES_PATH = 'data/courses.json'

export const PAGE_LIMIT = 9;

//Изменять только одновременно с константой в bormob
export const WORDS_PER_LESSON = 20;

export const BORMO_STATUS = {
  STARTED: 'started',
  PAUSED: 'paused',
  STOPPED: 'stopped'
}

export const VOICE_TEST_PHRASE = 'This is a voice test';

export const DRAWER_WIDTH = 260;