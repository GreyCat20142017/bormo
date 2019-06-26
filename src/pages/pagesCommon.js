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
