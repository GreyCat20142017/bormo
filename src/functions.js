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

 const getUniqueFromArray =  (entities) => {
    let temporaryObject = {};
    entities.forEach(function (item) {
      temporaryObject[item.toString()] = true;
    });
    return Object.keys(temporaryObject).map(function (key) {
      return key;
    });
  };

export const getDataByCondition =  (data, course, lesson) => {
  let courseContent = data.filter(item => item.course === course);
  let courseLessons = getUniqueFromArray(courseContent.map(item => item.lesson));

  if (!course) {
    return {lessons: [], content: [], lesson: lesson}
  }
  if (!lesson) {
    if (courseLessons.length > 0) {
      return {lessons: courseLessons, content: courseContent.filter(item => item.lesson === courseLessons[0]), lesson: courseLessons[0]}
    }
    return {lessons: [], content: [], lesson: lesson}
  }
  return {lessons: courseLessons, content: courseContent.filter(item => item.lesson === lesson), lesson: lesson}
};
