/**
 * Compares two arrays and returns the absent values
 * @param {*} array1
 * @param {*} array2
 * @param {*} key
 * @returns
 */
const getAbsentValues = (array1, array2, key) => {
  let result = [];
  result = array1.filter((element) => {
    return !array2.find((object) => {
      return element[key] === object[key];
    });
  });
  return result;
};

module.exports = getAbsentValues;
