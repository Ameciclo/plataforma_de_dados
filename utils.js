


function group_by(objetoArray, propriedade) {
    return objetoArray.reduce((acc, obj) => {
      let key = obj[propriedade]
      if (!acc[key]) acc[key] = []
      acc[key].push(obj)
      return acc;
    }, {});
  }
  
export default {group_by}

/**
function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

      exportToJsonFile(all_ciclos) */