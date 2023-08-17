const LANG = "pt-BR"
export const IntlNumber = (n, max = 3, min = 0) => {
  const INumber = new Intl.NumberFormat(LANG, {
    maximumFractionDigits: max,
    minimumFractionDigits: min,
  }).format(n);
  return INumber;
};
export const IntlNumberMin1Max3Digits = (n) => IntlNumber(n, 3, 1);
export const IntlNumberMax1Digit = (n) => IntlNumber(n, 1);
export const IntlNumber1Digit = (n) => IntlNumber(n, 1, 1);
export const IntlNumber2Digit = (n) => IntlNumber(n, 2, 2);
export const IntlNumber3Digit = (n) => IntlNumber(n, 3, 3);
export const IntlDateStr = (str) => {
  const date = new Date(str);
  const IDate = new Intl.DateTimeFormat(LANG).format(date);
  return IDate
};
export const IntlPercentil = (n) => {
  const INumber = new Intl.NumberFormat(LANG, {
    style: "percent",
    minimumFractionDigits: 1,
  }).format(n);
  return INumber
};

export function group_by(objetoArray, propriedade) {
  return objetoArray.reduce((acc, obj) => {
    let key = obj[propriedade];
    if (!acc[key]) acc[key] = [];
    acc[key].push(obj);
    return acc;
  }, {});
}

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (xs, f) => {
  return xs.reduce(
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {}
  );
};

/* var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}; */

export function filterByElement(jsonObject, element_value, element) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject[element] == element_value;
  })[0];
}
export function filterById(jsonObject, id) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["id"] == id;
  })[0];
}
export function filterByName(jsonObject, name) {
  return jsonObject.filter(function (jsonObject) {
    return jsonObject["name"] == name;
  })[0];
}

export function exportToJsonFile(jsonData, name) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  return dataUri;
}
/**     let exportFileDefaultName = name + '.json';

    let document = new Document
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

function exportToJsonFile(jsonData, name) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  let exportFileDefaultName = name + '.json';
}

exportToJsonFile(data, "observatorio-data")
*/
