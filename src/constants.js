export const voiceParams = {
  volume: {default: 1, min: 0, max: 1, step: 0.1, title: 'Громкость'},
  rate: {default: 1, min: 0.1, max: 10, step: 0.1, title: 'Скорость'},
  pitch: {default: 1, min: 0, max: 2, step: 0.1, title: 'Высота звука'}
};

export const PREFFERABLE_VOICE = 'Google UK English';

export const BORMO_PATH = 'data/bormo.json';
export const COURSES_PATH = 'data/courses.json';
export const PHRASES_PATH = 'data/phrases.json';

export const PAGE_LIMIT = 9;
export const ROW_LIMIT = 5;

//WORDS_PER_LESSON и PHRASES_PER_LESSON Изменять только одновременно с константами в bormob и bormophp !!!
export const WORDS_PER_LESSON = 20;
export const PHRASES_PER_LESSON = 7;

export const BORMO_STATUS = {
  STARTED: 'started',
  PAUSED: 'paused',
  STOPPED: 'stopped'
};

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

export const TIMER_INTERVAL = 3000;

export const DATA_SOURCES = {
  PHP_LOCAL: {
    COURSES: 'http://bormophp.local:8080/courses.php',
    SEARCH: 'http://bormophp.local:8080/search.php',
    PHRASES: 'http://bormophp.local:8080/phrases.php',
    disabled: false,
    COMMENT:'PHP (loсalhost)'
  },
  NODE_LOCAL: {
    COURSES: 'http://localhost:3377/courses',
    SEARCH: 'http://localhost:3377/search',
    PHRASES: 'http://localhost:3377/phrases',
    disabled: true,
    COMMENT:'Node (loсalhost)'
  },
  PHP_HOSTING_HTTP: {
    COURSES: 'http://bormo.pugalk8s.beget.tech/courses.php',
    SEARCH: 'http://bormo.pugalk8s.beget.tech/search.php',
    PHRASES: 'http://bormo.pugalk8s.beget.tech/phrases.php',
    disabled: false,
    COMMENT:'PHP (Beget, http)'
  },
  PHP_HOSTING_HTTPS: {
    COURSES: 'https://bormo.pugalk8s.beget.tech/courses.php',
    SEARCH: 'https://bormo.pugalk8s.beget.tech/search.php',
    PHRASES: 'https://bormo.pugalk8s.beget.tech/phrases.php',
    disabled: false,
    COMMENT:'PHP (Beget, https)'
  },
  NODE_HOSTING: {
    COURSES: 'Источник данных недоступен',
    SEARCH: 'Источник данных недоступен',
    PHRASES: 'Источник данных недоступен',
    disabled: true,
    COMMENT:'Node (Beget)'
  },
  TEST: {
    COURSES: COURSES_PATH,
    SEARCH: BORMO_PATH,
    PHRASES: PHRASES_PATH,
    disabled: false,
    COMMENT: 'Тестовые данные'
  }
};

export const TEST_KEY = 'TEST';

export const STATUS_OK = 200;

export const TRANSLATE_SOURCES = {
  SKYENG: 'SkyEng',
  DB: 'Database'
};

export const TOOLBAR_TYPES = {
  SPELLING_STARTED: 'spellingStarted',
  SPELLING_STOPPED: 'spellingStopped',
  PHRASES: 'phrases'
};

export const API_BRANCHES = {
  COURSES: 'COURSES',
  PHRASES: 'PHRASES',
  SEARCH: 'SEARCH'
};

export const EXCLUDED_COLUMNS = ['id', 'soundUrl', 'partOfSpeech'];

export const NAMES_RU = {
  id: 'ID',
  text: 'слово',
  partOfSpeech: 'часть речи',
  translationText: 'перевод',
  translationNote: 'примечание',
  transcription: 'транскрипция',
  soundUrl: 'звук'
};
