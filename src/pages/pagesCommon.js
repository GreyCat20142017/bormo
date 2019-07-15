import {BORMO_STATUS, LANGUAGES} from "../constants";

export const shuffleArray = (entities) => {
  let sortableEntities = entities.slice();
  for (let i = sortableEntities.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temporaryValue = sortableEntities[i];
    sortableEntities[i] = sortableEntities[j];
    sortableEntities[j] = temporaryValue;
  }
  return sortableEntities;
};

export const shuffleObjectArray = (entities) => {
  let sortableEntities = entities.slice();
  for (let i = sortableEntities.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temporaryValue = Object.assign({}, sortableEntities[i]);
    sortableEntities[i] = Object.assign({}, sortableEntities[j]);
    sortableEntities[j] = Object.assign({}, temporaryValue);
  }
  return sortableEntities;
};

export const isInactive = (index, stateArray) => {
  return stateArray[index].inactive;
};

export const getActiveAmount = (stateArray) => (
  stateArray.reduce((amount, current) => {
    amount += (current.inactive ? 0 : 1);
    return amount;
  }, 0)
);

export const getInitialMemorized = (length) => {
  return "?".repeat(length).split("").map((item, ind) => (({index: ind, inactive: false})))
};

export const getRandomOrder = (length) => {
  return shuffleArray("?".repeat(length).split("").map((item, ind) => (ind)))
};

export const getTranslateLanguage = (reverse) => (reverse ? LANGUAGES.EN : LANGUAGES.RU);

export const getOriginLanguage = (reverse) => (reverse ? LANGUAGES.RU : LANGUAGES.EN);

export const getModeInitialState = ({content, reverse}) => {
  const randomOrder = getRandomOrder(content.length);
  const maxIndex = content.length - 1;
  return ({
    currentIndex: 0,
    maxIndex: maxIndex,
    timerStatus: BORMO_STATUS.STARTED,
    memorized: getInitialMemorized(content.length),
    randomOrder: randomOrder,
    content: shuffleArray(content),
    errorCount: 0,
    okCount: 0,
    wasError: false
  });
}

export const getSpellInitialState = ({content, reverse}) => {
  return ({
    currentIndex: 0,
    maxIndex: content.length - 1,
    timerStatus: BORMO_STATUS.STARTED,
    content: shuffleObjectArray(content),
    errorCount: 0,
    okCount: 0,
    translate: '',
    wasError: false
  });
}

export const getCurrentTranslate = (currentIndex, maxIndex, randomOrder, reverse, content) => (
  (currentIndex >= 0 && randomOrder[currentIndex] <= maxIndex && randomOrder[currentIndex] >= 0) ?
    content[randomOrder[currentIndex]][getTranslateLanguage(reverse)] : ''
);
