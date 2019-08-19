import {DATA_SOURCES} from './constants';
import {ROUTES, ROUTES_TITLES} from './routes';

const getStringCompareResult =  (left, right) => {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

export const getValueArrayFromObject = (obj) => Object.keys(obj).map(key => obj[key]);

export const getRound = (number, precision) => {
  precision = precision || 0;
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
};

export const getInitialState = (currentTheme, isNotBormo, isConfigOpen = false) => (
  {
    isModalOpen: false,
    isConfigOpen: isConfigOpen,
    isSearchOpen: false,
    currentTheme: currentTheme,
    currentMode: null,
    currentCourse: null,
    currentLesson: null,
    courses: [],
    lessons: [],
    content: [],
    isLoading: true,
    config: {
      instantStart: true,
      instantNextMode: true,
      countErrorAtPrompt: true
    },
    APIkey: Object.keys(DATA_SOURCES)[0],
    soundMuted: false,
    onlyEnglish: true,
    voiceConfig: {
      russian: '',
      english: '',
      volume: 1, //0 - 1 step 0.2
      rate: 1,  //0.1 - 10 step 0.1
      pitch: 1 //0 - 2 step 0.1
    },
    mobileOpen: false,
    isNotBormo: isNotBormo
  }
);

export const isValidIndex = (index, testedArray) => (((index >= 0) && (index < testedArray.length)));

export const shuffleArray = function (entities) {
  const sortableEntities = entities.slice();
  for (let i = sortableEntities.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temporaryValue = sortableEntities[i];
    sortableEntities[i] = sortableEntities[j];
    sortableEntities[j] = temporaryValue;
  }
  return sortableEntities;
};

export const getSortedWords = (entities) =>
  (entities.slice().sort((firstItem, secondItem) => (getStringCompareResult( firstItem, secondItem))));


export const getStatusText = (route, currentCourse, currentLesson) => {
  const mode  = ROUTES_TITLES[route] || '';
  const details = [ROUTES.SEARCH, ROUTES.SKYENG, ROUTES.CONFIG].indexOf(route) !== -1 ? '' :
     ((currentCourse) ? ': ' + currentCourse.toString().toUpperCase() : '') + ((currentLesson) ?  '-' + currentLesson : '');
  return {mode, details};
}
