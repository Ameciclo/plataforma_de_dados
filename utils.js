function group_by(objetoArray, propriedade) {
    return objetoArray.reduce((acc, obj) => {
      let key = obj[propriedade]
      if (!acc[key]) acc[key] = []
      acc[key].push(obj)
      return acc;
    }, {});
  }

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
export default {group_by}

