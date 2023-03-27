export function group_by(objetoArray, propriedade) {
  return objetoArray.reduce((acc, obj) => {
    let key = obj[propriedade];
    if (!acc[key]) acc[key] = [];
    acc[key].push(obj);
    return acc;
  }, {});
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
  console.log(dataUri)
}

exportToJsonFile(data, "observatorio-data")
*/
