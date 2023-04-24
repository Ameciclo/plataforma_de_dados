import { firstColumnQuantitative, secondColumnQuantitative } from "./config";

export function getConfiguredDada(quantitativeCSV, qualitativeCSV) {
  const quantitative = getQuantitative(quantitativeCSV);
  const qualitative = getQualitative(qualitativeCSV);
  const summary = getSummary();
  return [summary, quantitative, qualitative];
}

function getQuantitative(data) {
  let quantitative = [];
  const firstData = firstColumnQuantitative;
  const secondData = secondColumnQuantitative;
  for (let i = 0; i < 12; i++) {
    const direction = firstData[i] + "_" + secondData[i];
    quantitative[direction] = {
      from: firstData[i],
      destination: secondData[i],
      count_per_hour: getCountHour(data, i),
    };
  }
  return quantitative;
}

function getQualitative(data) {
  let qualitative = [];
  const firstData = qualitativeHeadersColumn;
  for (let i = 0; i < firstData.length; i++) {
    qualitative[firstData[i]] = {
      count_per_hour: getCountHour(data, i),
    };
  }
  return qualitative;
}

function getCountHour(data, i) {
  return {
    6: data[i][0],
    7: data[i][1],
    8: data[i][2],
    9: data[i][3],
    10: data[i][4],
    11: data[i][5],
    12: data[i][6],
    13: data[i][7],
    14: data[i][8],
    15: data[i][9],
    16: data[i][10],
    17: data[i][11],
    18: data[i][12],
    19: data[i][13],
  };
}

function getMenQualitative(data) {
  return data.map((d) => d["total"] - d["women"] - d["childen"]);
}

function getSummary(summaryData) {
  return {
    report: summaryData[3][1],
    total: summaryData[4][1],
    hour_max: summaryData[5][1],
    women_percent: summaryData[6][1],
    men_percent: 1 - summaryData[6][1] - summaryData[7][1],
    children_percent: summaryData[7][1],
    sharing_percent: summaryData[8][1],
    helmet_percent: summaryData[9][1],
    cargo_percent: summaryData[10][1],
    service_percent: summaryData[11][1],
    wrong_way_percent: summaryData[12][1],
    sidewalk_percent: summaryData[13][1],
  };
}
