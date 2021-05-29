/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 2277:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _contagem_; },
  "getStaticPaths": function() { return /* binding */ getStaticPaths; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-map-gl/dist/es5/index.js
var es5 = __webpack_require__(5092);
// EXTERNAL MODULE: ./components/Layout.tsx + 2 modules
var Layout = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/next/head.js
var head = __webpack_require__(9008);
// EXTERNAL MODULE: ./components/Breadcrumb.tsx
var Breadcrumb = __webpack_require__(6325);
// EXTERNAL MODULE: ./components/InfoCard.tsx
var InfoCard = __webpack_require__(1656);
;// CONCATENATED MODULE: ./components/FlowChart/FlowStreetBackground.tsx





function FlowStreetBackground() {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#b4b4b4",
      d: "M98.897 38.669L98.897 98.943 38.623 98.943 38.623 219.493 98.897 219.493 98.897 279.768 219.447 279.768 219.447 219.493 279.721 219.493 279.721 98.943 219.447 98.943 219.447 38.669 98.897 38.669z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M38.62 104.832H108.412V108.00399999999999H38.62z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M38.623 209.876L38.623 213.049 105.242 213.049 105.242 279.768 108.415 279.768 108.415 213.049 108.415 209.976 108.415 209.876 38.623 209.876z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M209.928 104.832H279.719V108.00399999999999H209.928z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M209.928 209.882H279.719V213.055H209.928z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M209.926 38.213H213.099V108.005H209.926z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M105.24 38.213H108.41199999999999V108.005H105.24z"
    }), /*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#e7e6e6",
      d: "M209.926 209.973H213.099V279.765H209.926z"
    })]
  });
}

/* harmony default export */ var FlowChart_FlowStreetBackground = (FlowStreetBackground);
;// CONCATENATED MODULE: ./components/FlowChart/FlowTotalCount.tsx




function FlowTotalCount({
  totalCount
}) {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
    children: [/*#__PURE__*/jsx_runtime.jsx("path", {
      fill: "#008081",
      d: "M119.011 141.815H199.52499999999998V175.971H119.011z"
    }), /*#__PURE__*/jsx_runtime.jsx("text", {
      fill: "#fff",
      fontFamily: "Helvetica",
      fontSize: "30",
      transform: "translate(127.704 168.905)",
      children: totalCount
    })]
  });
}

/* harmony default export */ var FlowChart_FlowTotalCount = (FlowTotalCount);
;// CONCATENATED MODULE: ./components/FlowChart/FlowContainer.tsx







function FlowContainer({
  count,
  flowData
}) {
  function getFlowsFromDirection(direction) {
    return Object.keys(count.data.quantitative).filter(key => key.startsWith(`${direction}_`));
  }

  function getTotalCountFromFlow(flow) {
    let total = Object.values(count.data.quantitative[flow].count_per_hour);
    return total.reduce((sum, current) => sum + current, 0);
  }

  function getTotalCountFromDirection(direction) {
    let result = 0;
    getFlowsFromDirection(direction).forEach(flow => {
      result += getTotalCountFromFlow(flow);
    });
    return result;
  }

  return /*#__PURE__*/jsx_runtime.jsx(jsx_runtime.Fragment, {
    children: /*#__PURE__*/jsx_runtime.jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "400px",
      viewBox: "0 0 318.345 318.388",
      preserveAspectRatio: "xMidYMid meet",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
        children: [/*#__PURE__*/jsx_runtime.jsx(FlowChart_FlowStreetBackground, {}), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M108.5 159.162L101.174 149.919 101.174 154.446 67.216 154.446 67.216 144.39 47.186 144.39 47.186 173.935 67.216 173.935 67.216 163.879 101.174 163.879 101.174 168.406 108.5 159.162z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M99.257 112.135L90.014 119.461 94.541 119.461 94.541 122.326 67.216 122.326 67.216 112.27 47.186 112.27 47.186 141.815 67.216 141.815 67.216 131.758 94.541 131.758 103.973 131.758 103.973 119.461 108.5 119.461 99.257 112.135z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M103.973 198.864L103.973 186.566 94.541 186.566 67.216 186.566 67.216 176.51 47.186 176.51 47.186 206.055 67.216 206.055 67.216 195.999 94.541 195.999 94.541 198.864 90.014 198.864 99.257 206.19 108.5 198.864 103.973 198.864z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M209.928 159.162L217.254 149.919 217.254 154.446 251.212 154.446 251.212 144.39 271.242 144.39 271.242 173.935 251.212 173.935 251.212 163.879 217.254 163.879 217.254 168.406 209.928 159.162z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M219.171 112.135L228.414 119.461 223.887 119.461 223.887 122.326 251.212 122.326 251.212 112.27 271.242 112.27 271.242 141.815 251.212 141.815 251.212 131.758 223.887 131.758 214.455 131.758 214.455 119.461 209.928 119.461 219.171 112.135z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M214.455 198.864L214.455 186.566 223.887 186.566 251.212 186.566 251.212 176.51 271.242 176.51 271.242 206.055 251.212 206.055 251.212 195.999 223.887 195.999 223.887 198.864 228.414 198.864 219.171 206.19 209.928 198.864 214.455 198.864z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M159.214 209.876L149.971 217.202 154.498 217.202 154.498 251.16 144.441 251.16 144.441 271.19 173.986 271.19 173.986 251.16 163.93 251.16 163.93 217.202 168.457 217.202 159.214 209.876z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M112.187 219.119L119.513 228.363 119.513 223.836 122.378 223.836 122.378 251.16 112.321 251.16 112.321 271.19 141.866 271.19 141.866 251.16 131.81 251.16 131.81 223.836 131.81 214.403 119.513 214.403 119.513 209.876 112.187 219.119z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M198.915 214.403L186.618 214.403 186.618 223.836 186.618 251.16 176.561 251.16 176.561 271.19 206.107 271.19 206.107 251.16 196.05 251.16 196.05 223.836 198.915 223.836 198.915 228.363 206.241 219.119 198.915 209.876 198.915 214.403z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M159.214 108.448L149.971 101.123 154.498 101.123 154.498 67.165 144.441 67.165 144.441 47.135 173.986 47.135 173.986 67.165 163.93 67.165 163.93 101.123 168.457 101.123 159.214 108.448z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M112.187 99.205L119.513 89.962 119.513 94.489 122.378 94.489 122.378 67.165 112.321 67.165 112.321 47.135 141.866 47.135 141.866 67.165 131.81 67.165 131.81 94.489 131.81 103.921 119.513 103.921 119.513 108.448 112.187 99.205z"
        }), /*#__PURE__*/jsx_runtime.jsx("path", {
          fill: "#e7e6e6",
          d: "M198.915 103.921L186.618 103.921 186.618 94.489 186.618 67.165 176.561 67.165 176.561 47.135 206.107 47.135 206.107 67.165 196.05 67.165 196.05 94.489 198.915 94.489 198.915 89.962 206.241 99.205 198.915 108.448 198.915 103.921z"
        }), /*#__PURE__*/jsx_runtime.jsx(FlowChart_FlowTotalCount, {
          totalCount: count.summary.total
        }), /*#__PURE__*/jsx_runtime.jsx("g", {
          clipPath: "url(#clip-path)",
          children: /*#__PURE__*/jsx_runtime.jsx("path", {
            fill: "#e30613",
            d: "M279.721 98.944H298.533V219.489H279.721z"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#fff",
          fontFamily: "Helvetica",
          fontSize: "20",
          transform: "rotate(90 68.876 213.325)",
          children: getTotalCountFromDirection("east")
        }), /*#__PURE__*/jsx_runtime.jsx("g", {
          clipPath: "url(#clip-path)",
          children: /*#__PURE__*/jsx_runtime.jsx("path", {
            fill: "#e30613",
            d: "M98.898 279.764H219.44299999999998V298.576H98.898z"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#fff",
          fontFamily: "Helvetica",
          fontSize: "20",
          transform: "translate(144.403 296.096)",
          children: getTotalCountFromDirection("south")
        }), /*#__PURE__*/jsx_runtime.jsx("g", {
          clipPath: "url(#clip-path)",
          children: /*#__PURE__*/jsx_runtime.jsx("path", {
            fill: "#e30613",
            d: "M19.811 98.946H38.623000000000005V219.49099999999999H19.811z"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#fff",
          fontFamily: "Helvetica",
          fontSize: "20",
          transform: "rotate(-90 105.064 68.92)",
          children: getTotalCountFromDirection("west")
        }), /*#__PURE__*/jsx_runtime.jsx("g", {
          clipPath: "url(#clip-path)",
          children: /*#__PURE__*/jsx_runtime.jsx("path", {
            fill: "#e30613",
            d: "M98.898 19.812H219.44299999999998V38.623000000000005H98.898z"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#fff",
          fontFamily: "Helvetica",
          fontSize: "20",
          transform: "translate(144.403 36.145)",
          children: getTotalCountFromDirection("north")
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
          children: [/*#__PURE__*/jsx_runtime.jsx("rect", {
            x: "98",
            y: "0",
            width: "121",
            height: "19",
            fill: "#008081"
          }), /*#__PURE__*/jsx_runtime.jsx("text", {
            fill: "#fff",
            fontFamily: "Helvetica",
            fontSize: "12",
            x: "50%",
            y: "3%",
            dominantBaseline: "middle",
            textAnchor: "middle",
            className: "uppercase",
            children: count.north.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
          children: [/*#__PURE__*/jsx_runtime.jsx("rect", {
            x: "98",
            y: "299",
            width: "121",
            height: "19",
            fill: "#008081"
          }), /*#__PURE__*/jsx_runtime.jsx("text", {
            fill: "#fff",
            fontFamily: "Helvetica",
            fontSize: "12",
            x: "50%",
            y: "97%",
            dominantBaseline: "middle",
            textAnchor: "middle",
            className: "uppercase",
            children: count.south.name
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("g", {
          children: [/*#__PURE__*/jsx_runtime.jsx("rect", {
            x: "300",
            y: "99",
            width: "19",
            height: "121",
            fill: "#008081"
          }), /*#__PURE__*/jsx_runtime.jsx("text", {
            textAnchor: "start",
            fill: "#fff",
            fontFamily: "Helvetica",
            fontSize: "10",
            transform: "rotate(90 85 221)",
            className: "uppercase",
            children: count.east.name
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("g", {
          clipPath: "url(#clip-path)",
          children: /*#__PURE__*/jsx_runtime.jsx("path", {
            fill: "#008081",
            d: "M0 98.946H18.811V219.49099999999999H0z"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#fff",
          fontFamily: "Helvetica",
          fontSize: "10",
          transform: "rotate(-90 96.574 82.444)",
          className: "uppercase",
          children: count.west.name
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "rotate(-90 132.225 69.606)",
          children: getTotalCountFromFlow("west_south")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.09em",
          transform: "rotate(-90 117.974 55.354)",
          children: getTotalCountFromFlow("west_east")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.09em",
          transform: "rotate(-90 100.325 37.705)",
          children: getTotalCountFromFlow("west_north")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "rotate(90 70.33 186.597)",
          children: getTotalCountFromFlow("east_north")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "rotate(90 52.868 204.058)",
          children: getTotalCountFromFlow("east_west")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "rotate(90 36.43 220.496)",
          children: getTotalCountFromFlow("east_south")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(119.927 266.035)",
          children: getTotalCountFromFlow("south_west")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(151.428 266.035)",
          children: getTotalCountFromFlow("south_north")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(184.303 266.035)",
          children: getTotalCountFromFlow("south_east")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(116.497 62.48)",
          children: getTotalCountFromFlow("north_west")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(152.42 62.48)",
          children: getTotalCountFromFlow("north_south")
        }), /*#__PURE__*/jsx_runtime.jsx("text", {
          fill: "#008081",
          fontFamily: "Helvetica",
          fontSize: "14.173",
          letterSpacing: "-.03em",
          transform: "translate(184.294 62.48)",
          children: getTotalCountFromFlow("north_east")
        })]
      })
    })
  });
}

/* harmony default export */ var FlowChart_FlowContainer = (FlowContainer);
// EXTERNAL MODULE: ./node_modules/highcharts-react-official/dist/highcharts-react.min.js
var highcharts_react_min = __webpack_require__(5708);
var highcharts_react_min_default = /*#__PURE__*/__webpack_require__.n(highcharts_react_min);
// EXTERNAL MODULE: ./node_modules/highcharts/highcharts.js
var highcharts = __webpack_require__(8840);
var highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts);
;// CONCATENATED MODULE: ./pages/contagens/[contagem].tsx




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const Contagem = ({
  count
}) => {
  const {
    0: popupInfo,
    1: setPopupInfo
  } = (0,react.useState)(null);
  const {
    0: viewport,
    1: setViewport
  } = (0,react.useState)({
    latitude: count.location.coordinates[0],
    longitude: count.location.coordinates[1],
    zoom: 17,
    bearing: 0,
    pitch: 0
  });
  const {
    0: settings,
    1: setsettings
  } = (0,react.useState)({
    dragPan: true,
    dragRotate: true,
    scrollZoom: false,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    boxZoom: true,
    doubleClickZoom: true
  });

  function getFlowsFromDirection(direction) {
    return Object.keys(count.data.quantitative).filter(key => key.startsWith(`${direction}_`));
  }

  function getTotalCountFromFlow(flow) {
    let total = Object.values(count.data.quantitative[flow].count_per_hour);
    return total.reduce((sum, current) => sum + current, 0);
  }

  function getTotalCountFromDirection(direction) {
    let result = 0;
    getFlowsFromDirection(direction).forEach(flow => {
      result += getTotalCountFromFlow(flow);
    });
    return result;
  }

  function getIconFor(direction) {
    switch (direction) {
      case "north":
        return "⬆️";

      case "south":
        return "⬇️";

      case "east":
        return "➡️";

      case "west":
        return "⬅️";
    }
  }

  let keyMap = new Map([["child", {
    name: "Crianças"
  }], ["women", {
    name: "Mulheres"
  }], ["men", {
    name: "Homens"
  }]]),
      hourlyBarKeysOriginal = ["men", "women", "child"],
      series = [],
      hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      summary = count.summary;
  hourlyBarKeysOriginal.forEach(hk => {
    series.push({
      name: keyMap.get(hk).name,
      data: Object.values(count.data.qualitative[hk].count_per_hour)
    });
  });
  let flowData = {};
  ["north", "east", "west", "south"].forEach(d => {
    if (count[d]) {
      flowData[d] = {};
    }
  });
  const dayOptions = {
    chart: {
      type: "column"
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}:00h</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>'
    },
    title: {
      text: "Quantos dias da semana costuma utilizar a bicicleta como meio de transporte"
    },
    xAxis: {
      type: "category",
      categories: hours,
      title: {
        text: "Hora"
      }
    },
    yAxis: {
      title: {
        text: "Quantidade"
      },
      scrollbar: {
        enabled: true
      }
    },
    series,
    credits: {
      enabled: false
    }
  };
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Layout/* default */.Z, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(head.default, {
      children: [/*#__PURE__*/jsx_runtime.jsx("title", {
        children: "Plataforma de Dados | Contagens"
      }), /*#__PURE__*/jsx_runtime.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "text-white text-center justify-center align-middle content-center flex w-full bg-ameciclo flex-col",
      style: {
        height: "25vh"
      },
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "container mx-auto pt-24 md:pt-0",
        children: /*#__PURE__*/jsx_runtime.jsx("h1", {
          className: "text-4xl font-bold truncate",
          children: count.name
        })
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "bg-ameciclo text-white p-4 items-center uppercase flex text-xs md:text-base",
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "container mx-auto",
        children: /*#__PURE__*/jsx_runtime.jsx(Breadcrumb/* default */.Z, {
          label: count.name,
          slug: count._id,
          routes: ["/", "/contagens", count._id]
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("main", {
      className: "flex-auto",
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: "mx-auto text-center my-24",
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100",
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
            children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
              children: "Total de ciclistas"
            }), /*#__PURE__*/jsx_runtime.jsx("h3", {
              className: "text-5xl font-bold mt-2",
              children: count.summary.total
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
            children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
              children: "Pico em 1h"
            }), /*#__PURE__*/jsx_runtime.jsx("h3", {
              className: "text-5xl font-bold mt-2",
              children: count.summary.hour_max
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
            children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
              children: "Data da contagem"
            }), /*#__PURE__*/jsx_runtime.jsx("h3", {
              className: "text-5xl font-bold mt-2",
              children: count.date.substr(0, 10).split("-").reverse().join("/")
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
            children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
              children: "Dados"
            }), /*#__PURE__*/jsx_runtime.jsx("a", {
              href: count.summary.download_xlsx_url,
              className: "border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2",
              children: "XLSX"
            }), /*#__PURE__*/jsx_runtime.jsx("a", {
              href: `https://api.contagem.ameciclo.org/v1/cyclist-count/${count._id}`,
              className: "border border-teal-500 text-teal-500 hover:bg-ameciclo hover:text-white rounded px-4 py-2 mt-2",
              children: "JSON"
            })]
          })]
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("section", {
        className: "container mx-auto grid lg:grid-cols-3 md:grid-cols-1 auto-rows-auto gap-10 my-10",
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: "bg-green-200 rounded h-32 shadow-2xl lg:col-span-2 col-span-3",
          style: {
            minHeight: "400px"
          },
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)(es5/* default */.ZP, _objectSpread(_objectSpread(_objectSpread({}, viewport), settings), {}, {
            onViewportChange: nextViewport => setViewport(nextViewport),
            width: "100%",
            height: "100%",
            mapStyle: "mapbox://styles/mapbox/light-v10",
            mapboxApiAccessToken: "pk.eyJ1IjoiaWFjYXB1Y2EiLCJhIjoiODViMTRmMmMwMWE1OGIwYjgxNjMyMGFkM2Q5OWJmNzUifQ.OFgXp9wbN5BJlpuJEcDm4A",
            children: [/*#__PURE__*/jsx_runtime.jsx("div", {
              style: {
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '10px',
                zIndex: 500
              },
              children: /*#__PURE__*/jsx_runtime.jsx(es5/* NavigationControl */.Pv, {})
            }), /*#__PURE__*/jsx_runtime.jsx(es5/* Marker */.Jx, {
              latitude: count.location.coordinates[0],
              longitude: count.location.coordinates[1],
              children: /*#__PURE__*/jsx_runtime.jsx("svg", {
                height: 40,
                viewBox: "0 0 24 24",
                style: {
                  fill: "#028083",
                  stroke: "none",
                  transform: `translate(${-40 / 2}px,${-40}px)`
                },
                children: /*#__PURE__*/jsx_runtime.jsx("path", {
                  d: `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`
                })
              })
            }), ["north", "east", "west", "south"].map((d, i) => {
              var _count$d, _count$d2;

              return /*#__PURE__*/jsx_runtime.jsx(es5/* Marker */.Jx, {
                latitude: (_count$d = count[d]) === null || _count$d === void 0 ? void 0 : _count$d.location.coordinates[1],
                longitude: (_count$d2 = count[d]) === null || _count$d2 === void 0 ? void 0 : _count$d2.location.coordinates[0],
                children: /*#__PURE__*/jsx_runtime.jsx("svg", {
                  className: "cursor-pointer",
                  height: 40,
                  viewBox: "0 0 24 24",
                  style: {
                    fill: "#028083",
                    stroke: "none",
                    transform: `translate(${-40 / 2}px,${-40}px)`
                  },
                  onClick: () => {
                    setPopupInfo(d);
                  },
                  children: /*#__PURE__*/jsx_runtime.jsx("path", {
                    d: `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`
                  })
                })
              }, i);
            }), popupInfo && /*#__PURE__*/jsx_runtime.jsx(jsx_runtime.Fragment, {
              children: /*#__PURE__*/(0,jsx_runtime.jsxs)(es5/* Popup */.GI, {
                tipSize: 5,
                anchor: "top",
                longitude: count[popupInfo].location.coordinates[0],
                latitude: count[popupInfo].location.coordinates[1],
                closeOnClick: false,
                onClose: () => setPopupInfo(null),
                children: [/*#__PURE__*/jsx_runtime.jsx("span", {
                  children: /*#__PURE__*/jsx_runtime.jsx("b", {
                    children: count[popupInfo].name
                  })
                }), /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
                  children: ["Total: ", getTotalCountFromDirection(popupInfo), /*#__PURE__*/jsx_runtime.jsx("br", {}), /*#__PURE__*/jsx_runtime.jsx("br", {}), count[popupInfo].name, " para.."]
                }), getFlowsFromDirection(popupInfo).map(flow => {
                  return /*#__PURE__*/(0,jsx_runtime.jsxs)("p", {
                    children: [getIconFor(flow.split("_")[1]), " ", count[flow.split("_")[1]].name, ": ", getTotalCountFromFlow(flow), " "]
                  });
                })]
              })
            })]
          }))
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: "rounded shadow-2xl lg:col-span-1 col-span-3 flex justify-between flex-col",
          children: /*#__PURE__*/jsx_runtime.jsx(FlowChart_FlowContainer, {
            count: count,
            flowData: flowData
          })
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("section", {
        className: "container mx-auto grid grid-cols-3 md:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10",
        children: [/*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.women_percent,
          label: "Mulheres",
          icon: "women"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.children_percent,
          label: "Crianças e Adolescentes",
          icon: "children"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.helmet_percent,
          label: "Capacete",
          icon: "helmet"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.service_percent,
          label: "Serviço",
          icon: "service"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.cargo_percent,
          label: "Cargueira",
          icon: "cargo"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.wrong_way_percent,
          label: "Contramão",
          icon: "wrong_way"
        }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
          data: summary.sidewalk_percent,
          label: "Calçada",
          icon: "sidewalk"
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("section", {
        className: "container mx-auto grid grid-cols-1 auto-rows-auto gap-10 my-10",
        children: /*#__PURE__*/jsx_runtime.jsx("div", {
          className: "shadow-2xl rounded p-10 text-center overflow-x-scroll",
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            style: {
              minWidth: "500px"
            },
            children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
              className: "text-gray-600 text-3xl",
              children: "Quantidade de ciclistas por hora"
            }), /*#__PURE__*/jsx_runtime.jsx((highcharts_react_min_default()), {
              highcharts: (highcharts_default()),
              options: dayOptions
            })]
          })
        })
      })]
    })]
  });
};

async function getStaticPaths() {
  const res = await fetch("https://api.contagem.ameciclo.org/v1/cyclist-count/");
  const cyclistCount = await res.json(); // Get the paths we want to pre-render based on posts

  const paths = cyclistCount.data.map(c => ({
    params: {
      contagem: c._id
    }
  }));
  return {
    paths,
    fallback: false
  };
}
async function getStaticProps({
  params
}) {
  const res = await fetch(`https://api.contagem.ameciclo.org/v1/cyclist-count/${params.contagem}`);
  const {
    cyclistCount
  } = await res.json();
  return {
    props: {
      count: cyclistCount
    },
    revalidate: 1
  };
}
/* harmony default export */ var _contagem_ = (Contagem);

/***/ }),

/***/ 4740:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": function() { return /* binding */ getStaticProps; },
/* harmony export */   "getStaticPaths": function() { return /* binding */ getStaticPaths; },
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; },
/* harmony export */   "unstable_getStaticParams": function() { return /* binding */ unstable_getStaticParams; },
/* harmony export */   "unstable_getStaticProps": function() { return /* binding */ unstable_getStaticProps; },
/* harmony export */   "unstable_getStaticPaths": function() { return /* binding */ unstable_getStaticPaths; },
/* harmony export */   "unstable_getServerProps": function() { return /* binding */ unstable_getServerProps; },
/* harmony export */   "config": function() { return /* binding */ config; },
/* harmony export */   "_app": function() { return /* binding */ _app; },
/* harmony export */   "renderReqToHTML": function() { return /* binding */ renderReqToHTML; },
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3660);
/* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5706);
/* harmony import */ var private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2738);
/* harmony import */ var private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9392);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9436);

      
      
      
      

      
      const { processEnv } = __webpack_require__(2333)
      processEnv([])
    
      
      const runtimeConfig = {}
      ;

      const documentModule = __webpack_require__(2400)

      const appMod = __webpack_require__(7421)
      let App = appMod.default || appMod.then && appMod.then(mod => mod.default);

      const compMod = __webpack_require__(2277)

      const Component = compMod.default || compMod.then && compMod.then(mod => mod.default)
      /* harmony default export */ __webpack_exports__["default"] = (Component);
      const getStaticProps = compMod['getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['getStaticProp' + 's'])
      const getStaticPaths = compMod['getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['getStaticPath' + 's'])
      const getServerSideProps = compMod['getServerSideProp' + 's'] || compMod.then && compMod.then(mod => mod['getServerSideProp' + 's'])

      // kept for detecting legacy exports
      const unstable_getStaticParams = compMod['unstable_getStaticParam' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticParam' + 's'])
      const unstable_getStaticProps = compMod['unstable_getStaticProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticProp' + 's'])
      const unstable_getStaticPaths = compMod['unstable_getStaticPath' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getStaticPath' + 's'])
      const unstable_getServerProps = compMod['unstable_getServerProp' + 's'] || compMod.then && compMod.then(mod => mod['unstable_getServerProp' + 's'])

      let config = compMod['confi' + 'g'] || (compMod.then && compMod.then(mod => mod['confi' + 'g'])) || {}
      const _app = App

      const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
        ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
        : []

      if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
        combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
      }

      const { renderReqToHTML, render } = (0,next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__/* .getPageHandler */ .u)({
        pageModule: compMod,
        pageComponent: Component,
        pageConfig: config,
        appModule: App,
        documentModule: documentModule,
        errorModule: __webpack_require__(900),
        notFoundModule: undefined,
        pageGetStaticProps: getStaticProps,
        pageGetStaticPaths: getStaticPaths,
        pageGetServerSideProps: getServerSideProps,

        assetPrefix: "",
        canonicalBase: "",
        generateEtags: true,
        poweredByHeader: true,

        runtimeConfig,
        buildManifest: private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__,
        reactLoadableManifest: private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__,

        rewrites: combinedRewrites,
        i18n: undefined,
        page: "/contagens/[contagem]",
        buildId: "Z6TwkfAjJbWNvakg093w-",
        escapedBuildId: "Z6TwkfAjJbWNvakg093w\-",
        basePath: "",
        pageIsDynamic: true,
        encodedPreviewProps: {previewModeId:"4ea9070f1495f62611deff951fcbcfa5",previewModeSigningKey:"e6f7cd086541dc82b0aed2fc504c93e82f0e3bb17441d306352ce8afda035f4f",previewModeEncryptionKey:"492caa373333eeefe29bd09bda42ec592b1c50da583ebc3f1ee5cf9bccac1f0b"}
      })
      
    

/***/ }),

/***/ 4293:
/***/ (function(module) {

module.exports = require("buffer");;

/***/ }),

/***/ 5532:
/***/ (function(module) {

module.exports = require("critters");;

/***/ }),

/***/ 6417:
/***/ (function(module) {

module.exports = require("crypto");;

/***/ }),

/***/ 8614:
/***/ (function(module) {

module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ (function(module) {

module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ (function(module) {

module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ (function(module) {

module.exports = require("https");;

/***/ }),

/***/ 3700:
/***/ (function(module) {

module.exports = require("next/dist/compiled/@ampproject/toolbox-optimizer");;

/***/ }),

/***/ 2087:
/***/ (function(module) {

module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ (function(module) {

module.exports = require("path");;

/***/ }),

/***/ 1191:
/***/ (function(module) {

module.exports = require("querystring");;

/***/ }),

/***/ 2413:
/***/ (function(module) {

module.exports = require("stream");;

/***/ }),

/***/ 4304:
/***/ (function(module) {

module.exports = require("string_decoder");;

/***/ }),

/***/ 8835:
/***/ (function(module) {

module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ (function(module) {

module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ (function(module) {

module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = function() {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [417,333,708,626,13,92,554,618,325,656], function() { return __webpack_require__(4740); })
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	                // Font manifest declaration
/******/ 	                __webpack_require__.__NEXT_FONT_MANIFEST__ = [];
/******/ 	            // Enable feature:
/******/ 	            process.env.__NEXT_OPTIMIZE_FONTS = JSON.stringify(true);/* webpack/runtime/require chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			61: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = function(chunkId) { return installedChunks[chunkId]; };
/******/ 		
/******/ 		var installChunk = function(chunk) {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = function(chunkId, promises) {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("../../chunks/" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	!function() {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			__webpack_require__.e(417);
/******/ 			__webpack_require__.e(333);
/******/ 			__webpack_require__.e(708);
/******/ 			__webpack_require__.e(626);
/******/ 			__webpack_require__.e(13);
/******/ 			__webpack_require__.e(92);
/******/ 			__webpack_require__.e(554);
/******/ 			__webpack_require__.e(618);
/******/ 			__webpack_require__.e(325);
/******/ 			__webpack_require__.e(656);
/******/ 			return next();
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;