export const voiceParams = {
  volume: {default: 1, min: 0, max: 1, step: 0.1, title: 'Громкость'},
  rate: {default: 1, min: 0.1, max: 10, step: 0.1, title: 'Скорость'},
  pitch: {default: 1, min: 0, max: 2, step: 0.1, title: 'Высота звука'}
};

export const PREFFERABLE_VOICE = 'Google UK English';

export const DATA_PATH = 'data/bormo.json'
export const COURSES_PATH = 'data/courses.json'

export const PAGE_LIMIT = 9;

export const ROW_LIMIT = 5;

//Изменять только одновременно с константой в bormob и bormophp !!!
export const WORDS_PER_LESSON = 20;

export const BORMO_STATUS = {
  STARTED: 'started',
  PAUSED: 'paused',
  STOPPED: 'stopped'
}

export const VOICE_TEST_PHRASE = 'This is a voice test';

export const DRAWER_WIDTH = 260;

const url = window.location.origin;
export const SERVER_ROOT = (url.match(/github\.io/gi)) ? '/bormo/' : '/';

export const KEY_CODES = {
  ESC: 27,
  ENTER: 13,
  SPACE: 32,
  TAB: 9
};

export const LANGUAGES = {EN: 'english', RU: 'russian'};

export const SKYENG_URL = `https://dictionary.skyeng.ru/api/public/v1/words/search`;

export const DATA_SOURCES = {
  PHP_LOCAL: {COURSES: 'http://bormophp.local:8080/courses.php', SEARCH: 'http://bormophp.local:8080/search.php'},
  NODE_LOCAL: {COURSES: 'http://localhost:3377/courses', SEARCH: 'http://localhost:3377/search'},
  PHP_HOSING: {COURSES: 'Источник данных недоступен', SEARCH: 'Источник данных недоступен'},
  NODE_HOSTING: {COURSES: 'Источник данных недоступен', SEARCH: 'Источник данных недоступен'}
};

export const STATUS_OK = 200;


export const TRANSLATE_SOURCES = {
  SKYENG: 'SkyEng',
  DB: 'Database'
};
