function radarSytle (series, categories) {
  return {
    chart: {
      polar: true,
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "EVOLUÇÃO DA NOTA",
    },
    subtitle: {
      text: 'Notas que compõem a média'
    },
    pane: {
      size: "70%",
//      startAngle: 0,
 //     endAngle: 120
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: "on",
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      min: 0,
      max: 10,
    },
    tooltip: {
      shared: true,
      pointFormat:
        '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>',
    },
    colors: ['#008080', '#E02F31', '#000000', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    series: series,
  }
}

export default radarSytle;