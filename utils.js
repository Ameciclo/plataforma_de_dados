function group_by(objetoArray, propriedade) {
    return objetoArray.reduce((acc, obj) => {
      let key = obj[propriedade]
      if (!acc[key]) acc[key] = []
      acc[key].push(obj)
      return acc;
    }, {});
  }

  function filterByElement(jsonObject, element_value, element) {return jsonObject.filter(function(jsonObject) {return (jsonObject[element] == element_value);})[0];}
  function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}
  function filterByName(jsonObject, name) {return jsonObject.filter(function(jsonObject) {return (jsonObject['name'] == name);})[0];}

/** 
function exportToJsonFile(jsonData, name) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = name + '.json';

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
export default {group_by, filterByElement, filterById, filterByName}

