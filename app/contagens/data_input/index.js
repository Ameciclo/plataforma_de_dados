// TODO novo banco de contagens um schema
// novo formatos de dados
// compatível com a planilha
// 

import { getConfiguredData, getLocation } from "./data_config";

function sendToDB(json) {
  var token = "JD0bmBumnFVBXaSwOjkDi2hkTrTsAGUlzCQ3NJFB";
  var projectsReference = "https://ameciclo-admin-bot.firebaseio.com/";
  //  var database = FirebaseApp.getDatabaseByUrl(projectsReference, token);
  //  console.log(database.pushData("cyclist_counts_test", json))

  // var options = {
  //   'method' : 'post',
  //   'contentType': 'application/json',
  //   // Convert the JavaScript object to a JSON string.
  //   'payload' : JSON.stringify(json)
  // };

  // fetch('https://api.plataforma.ameciclo.org/contagens/v1/cyclist-count/', options);
}

function importNewCounting(id) {
  const summaryData = {}; // vem do Strapi
  const [qualitativeCSV, quantitativeCSV] = getDataFromCSVs(id);
  const [summary, quantitative, qualitative] = getConfiguredData(
    quantitativeCSV,
    qualitativeCSV
  );
  const location = getLocation(summaryData);

  const newCyclistCount = {
    name: summaryData.name,
    date: summaryData.date,
    summary: {
      ...summary,
    },
    location: {
      ...location,
    },
    data: {
      quantitative: {
        ...quantitative,
      },
      qualitative: {
        ...qualitative,
      },
    },
  };

  sendToDB(newCyclistCount);
}