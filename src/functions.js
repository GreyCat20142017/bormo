// const shuffleArray = (entities) => {
//     let sortableEntities = entities.slice();
//     for (let i = sortableEntities.length - 1; i > 0; i--) {
//       let j = Math.floor(Math.random() * (i + 1));
//       let temporaryValue = sortableEntities[i];
//       sortableEntities[i] = sortableEntities[j];
//       sortableEntities[j] = temporaryValue;
//     }
//     return sortableEntities;
//   };

// const getStringCompareResult =  (left, right) => {
//     if (left > right) {
//       return 1;
//     } else if (left < right) {
//       return -1;
//     } else {
//       return 0;
//     }
//   };

export const getArrayFromObject = (obj) => Object.keys(obj).map(key => obj[key]);

// const getUniqueFromArray =  (entities) => {
//    let temporaryObject = {};
//    entities.forEach(item => {
//      temporaryObject[item.toString()] = true;
//    });
//    return Object.keys(temporaryObject).map(key => key);
//  };


export const getInitialState = (currentTheme) => (
  {
    isModalOpen: false,
    isConfigOpen: false,
    currentTheme: currentTheme,
    currentMode: null,
    currentCourse: null,
    currentLesson: null,
    courses: [],
    lessons: [],
    content: [],
    data: [],
    isLoading: true,
    isDataLoading: true,
    config: {
      instantStart: false,
      instantNextMode: true,
      countErrorAtPrompt: true,
      checkedModes: {},
      useAPIData: false,
      apiURL: 'http://localhost:3377/'
    },
    noSound: true,
    voiceConfig: {
      onlyEnglish: true,
      russian: '',
      english: '',
      volume: 1, //0 - 1 step 0.2
      rate: 1,  //0.1 - 10 step 0.1
      pitch: 1 //0 - 2 step 0.1
    }

  }
);
