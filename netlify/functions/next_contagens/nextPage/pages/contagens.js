/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 4948:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ contagens; },
  "getServerSideProps": function() { return /* binding */ getServerSideProps; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./components/Layout.tsx + 2 modules
var Layout = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/next/head.js
var head = __webpack_require__(9008);
// EXTERNAL MODULE: ./node_modules/react-table/index.js
var react_table = __webpack_require__(9521);
// EXTERNAL MODULE: ./node_modules/match-sorter/dist/match-sorter.cjs.js
var match_sorter_cjs = __webpack_require__(3852);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/ColumnFilter.tsx




const ColumnFilter = ({
  column
}) => {
  const {
    filterValue,
    setFilter
  } = column;
  return /*#__PURE__*/jsx_runtime.jsx(jsx_runtime.Fragment, {
    children: /*#__PURE__*/jsx_runtime.jsx("input", {
      className: "my-2 max-w-sm text-gray-600 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none",
      type: "search",
      name: "search",
      placeholder: "Buscar",
      value: filterValue || "",
      onChange: e => setFilter(e.target.value)
    })
  });
};

/* harmony default export */ var components_ColumnFilter = (ColumnFilter);
;// CONCATENATED MODULE: ./components/ContagensTable.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function fuzzyTextFilterFn(rows, id, filterValue) {
  return (0,match_sorter_cjs/* matchSorter */.Lu)(rows, filterValue, {
    keys: [row => row.values[id]]
  });
} // Let the table remove the filter if the string is empty


fuzzyTextFilterFn.autoRemove = val => !val;

const ContagensTable = ({
  data
}) => {
  const filterTypes = react.useMemo(() => ({
    // Add a new fuzzyTextFilterFn filter type.
    fuzzyText: fuzzyTextFilterFn,
    // Or, override the default text filter to use
    // "startWith"
    text: (rows, id, filterValue) => {
      return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue !== undefined ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase()) : true;
      });
    }
  }), []);
  const columns = react.useMemo(() => [{
    Header: "Nome",
    accessor: "name",
    Cell: ({
      row
    }) => /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
      href: `contagens/${row.original._id}`,
      children: /*#__PURE__*/jsx_runtime.jsx("a", {
        className: "text-ameciclo",
        children: row.original.name
      })
    }, row.original._id),
    Filter: components_ColumnFilter
  }, {
    Header: "Data",
    accessor: "date",
    Cell: ({
      value
    }) => /*#__PURE__*/jsx_runtime.jsx("span", {
      children: value.substr(0, 10).split("-").reverse().join("/")
    }),
    Filter: components_ColumnFilter
  }, {
    Header: "Total de Ciclistas",
    accessor: "summary.total",
    Filter: components_ColumnFilter,
    disableFilters: true
  }, {
    Header: "Dados",
    Cell: ({
      row
    }) => /*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
      children: [/*#__PURE__*/jsx_runtime.jsx(next_link.default, {
        href: row.original.summary.download_xlsx_url,
        children: /*#__PURE__*/jsx_runtime.jsx("a", {
          className: "text-ameciclo",
          children: "XLSX"
        })
      }), /*#__PURE__*/jsx_runtime.jsx("span", {
        children: " | "
      }), /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
        href: `https://api.contagem.ameciclo.org/v1/cyclist-count/${row.original._id}`,
        children: /*#__PURE__*/jsx_runtime.jsx("a", {
          className: "text-ameciclo",
          children: "JSON"
        })
      })]
    }),
    disableFilters: true
  }], []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    visibleColumns,
    state: {
      pageIndex
    }
  } = (0,react_table.useTable)({
    columns,
    data,
    initialState: {
      pageIndex: 0
    },
    filterTypes
  }, react_table.useFilters, react_table.useSortBy, react_table.usePagination);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "shadow overflow-x-auto bg-white border-b border-gray-200 sm:rounded-lg",
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("table", _objectSpread(_objectSpread({}, getTableProps()), {}, {
      className: "table-auto shadow min-w-full divide-y divide-gray-200",
      children: [/*#__PURE__*/jsx_runtime.jsx("thead", {
        children: headerGroups.map(headerGroup => /*#__PURE__*/jsx_runtime.jsx("tr", _objectSpread(_objectSpread({}, headerGroup.getHeaderGroupProps()), {}, {
          className: "bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-left",
          children: headerGroup.headers.map(column => /*#__PURE__*/(0,jsx_runtime.jsxs)("th", _objectSpread(_objectSpread({}, column.getHeaderProps()), {}, {
            className: "px-6 py-3 border-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider",
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", _objectSpread(_objectSpread({}, column.getSortByToggleProps({
              title: "Ordenar"
            })), {}, {
              className: "flex items-center",
              children: [column.render("Header"), /*#__PURE__*/jsx_runtime.jsx("span", {
                className: "inline-block",
                children: column.isSorted ? column.isSortedDesc ? " 🔽️" : " 🔼" : ""
              })]
            })), column.canFilter ? column.render("Filter") : null]
          })))
        })))
      }), /*#__PURE__*/jsx_runtime.jsx("tbody", _objectSpread(_objectSpread({}, getTableBodyProps()), {}, {
        className: "bg-white divide-y divide-gray-200 text-sm font-normal text-gray-700",
        children: page.map((row, i) => {
          prepareRow(row);
          return /*#__PURE__*/jsx_runtime.jsx("tr", _objectSpread(_objectSpread({}, row.getRowProps()), {}, {
            className: "hover:bg-gray-100 border-b border-gray-200 py-10",
            children: row.cells.map(cell => {
              return /*#__PURE__*/jsx_runtime.jsx("td", _objectSpread(_objectSpread({}, cell.getCellProps()), {}, {
                className: "px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700 truncate max-w-sm",
                children: cell.render("Cell")
              }));
            })
          }));
        })
      }))]
    })), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between",
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: "text-xs xs:text-sm text-gray-900",
        children: /*#__PURE__*/jsx_runtime.jsx("span", {
          children: `Página ${pageIndex + 1} de ${pageOptions.length}`
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "inline-flex mt-2 xs:mt-0",
        children: [/*#__PURE__*/jsx_runtime.jsx("button", {
          className: "text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l",
          onClick: () => previousPage(),
          disabled: !canPreviousPage,
          children: "Anterior"
        }), /*#__PURE__*/jsx_runtime.jsx("button", {
          className: "text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r",
          onClick: () => nextPage(),
          disabled: !canNextPage,
          children: "Pr\xF3xima"
        })]
      })]
    })]
  });
};

/* harmony default export */ var components_ContagensTable = (ContagensTable);
// EXTERNAL MODULE: ./node_modules/react-map-gl/dist/es5/index.js
var es5 = __webpack_require__(5092);
// EXTERNAL MODULE: ./components/Breadcrumb.tsx
var Breadcrumb = __webpack_require__(6325);
// EXTERNAL MODULE: ./components/InfoCard.tsx
var InfoCard = __webpack_require__(1656);
;// CONCATENATED MODULE: ./pages/contagens.tsx



function contagens_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function contagens_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { contagens_ownKeys(Object(source), true).forEach(function (key) { contagens_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { contagens_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function contagens_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const GridCard = ({
  title,
  text,
  icon,
  url = "#"
}) => {
  return /*#__PURE__*/jsx_runtime.jsx("a", {
    href: url,
    children: /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "bg-white bg-customGrey w-full rounded-lg flex items-center justify-center text-ameciclo p-8",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex flex-col text-center",
        children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
          className: "text-2xl font-bold text-ameciclo uppercase tracking-wider my-2",
          children: title
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          className: "text-base font-medium",
          children: text
        })]
      })
    })
  });
};

const Contagens = ({
  cyclistCounts,
  globalSummary
}) => {
  const groupBy = (xs, f) => {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
  };

  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
  const SIZE = 20;
  let countsGroupedByLocation = groupBy(cyclistCounts, count => count.name);
  let countsGroupedArray = Object.entries(countsGroupedByLocation);
  const {
    0: viewport,
    1: setViewport
  } = (0,react.useState)({
    latitude: -8.0584364,
    longitude: -34.945277,
    zoom: 10,
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
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Layout/* default */.Z, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(head.default, {
      children: [/*#__PURE__*/jsx_runtime.jsx("title", {
        children: "Contagens | Plataforma de Dados"
      }), /*#__PURE__*/jsx_runtime.jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "text-white text-center justify-center align-middle flex bg-ameciclo flex-col pt-24 md:pt-0",
      style: {
        height: "25vh"
      },
      children: /*#__PURE__*/jsx_runtime.jsx("h1", {
        className: "text-4xl font-bold",
        children: "Contagens"
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "bg-ameciclo text-white p-4 items-center uppercase flex",
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "container mx-auto",
        children: /*#__PURE__*/jsx_runtime.jsx(Breadcrumb/* default */.Z, {
          label: "Contagens",
          slug: "/contagens",
          routes: ["/", "/contagens"]
        })
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: "mx-auto text-center my-24",
      children: [/*#__PURE__*/jsx_runtime.jsx("h1", {
        className: "text-6xl font-bold",
        children: "Estat\xEDsticas Gerais"
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex flex-col md:flex-row bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-8 max-w-4xl divide-y md:divide-x divide-gray-100",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
          children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
            children: "Total de ciclistas"
          }), /*#__PURE__*/jsx_runtime.jsx("h3", {
            className: "text-5xl font-bold mt-2",
            children: globalSummary[0].totalAmount
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
          children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
            children: "Contagens Realizadas"
          }), /*#__PURE__*/jsx_runtime.jsx("h3", {
            className: "text-5xl font-bold mt-2",
            children: globalSummary[0].numberOfCounts
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
          children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
            children: "Pontos Monitorados"
          }), /*#__PURE__*/jsx_runtime.jsx("h3", {
            className: "text-5xl font-bold mt-2",
            children: countsGroupedArray.length
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "flex flex-col justify-center w-full p-6 text-center uppercase tracking-widest",
          children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
            children: "Máximo em um ponto"
          }), /*#__PURE__*/jsx_runtime.jsx("h3", {
            className: "text-5xl font-bold mt-2",
            children: globalSummary[0].MaximumValue
          })]
        })]
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("section", {
      className: "container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex flex-col sm:flex-row justify-between",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl",
          children: [/*#__PURE__*/jsx_runtime.jsx("h1", {
            className: "text-4xl font-bold mb-2",
            children: "O que \xE9?"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "Registramos as pessoas que passam de bicicleta durante 14 horas em um pr\xE9-escolhido cruzamento da cidade do Recife. As nossas contagens s\xE3o registradas manualmente atrav\xE9s da observa\xE7\xE3o das pessoas volunt\xE1rias na contagem, registrando a dire\xE7\xE3o do deslocamento e fatores qualitativos. Dentre esses fatores est\xE3o o g\xEAnero, tipo de bicicleta, uso de capacete, se est\xE3o dando carona, se s\xE3o crian\xE7as se est\xE3o \xE0 servi\xE7o e comportamentos como contram\xE3o e pedalada na cal\xE7ada. Ainda s\xE3o registrados outros fatores qualitativos que podem ser especificidades de cada local."
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl",
          children: [/*#__PURE__*/jsx_runtime.jsx("h1", {
            className: "text-4xl font-bold mb-2",
            children: "Para que serve?"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "As contagens de ciclistas s\xE3o importantes instrumentos de planejamento urbano. Elas permitem identificar os pontos de maior demanda por estruturas cicl\xE1veis, al\xE9m das tend\xEAncias futuras. A Ameciclo as utiliza como ferramentas para incidir no planejamento e tem seus dados abertos para serem usados pela m\xEDdia, academia ou quaisquer pessoa que assim deseje."
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("section", {
      className: "container mx-auto grid grid-cols-3 md:grid-cols-1 md:grid-cols-3 auto-rows-auto gap-10 my-10",
      children: [/*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalWomenPercentile,
        label: "Mulheres",
        icon: "women"
      }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalChildrenPercentile,
        label: "Crianças e Adolescentes",
        icon: "children"
      }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalHelmetPercentile,
        label: "Capacete",
        icon: "helmet"
      }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalServicePercentile,
        label: "Serviço",
        icon: "service"
      }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalCargoPercentile,
        label: "Cargueira",
        icon: "cargo"
      }), /*#__PURE__*/jsx_runtime.jsx(InfoCard/* default */.Z, {
        data: globalSummary[0].totalWrongWayPercentile,
        label: "Contramão",
        icon: "wrong_way"
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("section", {
      className: "container mx-auto my-10",
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "bg-green-200 rounded shadow-2xl",
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(es5/* default */.ZP, contagens_objectSpread(contagens_objectSpread(contagens_objectSpread({}, viewport), settings), {}, {
          onViewportChange: nextViewport => setViewport(nextViewport),
          width: "100%",
          height: "500px",
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
            children: /*#__PURE__*/jsx_runtime.jsx(es5/* FullscreenControl */.ot, {})
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            style: {
              position: 'absolute',
              top: 40,
              right: 0,
              padding: '10px',
              zIndex: 500
            },
            children: /*#__PURE__*/jsx_runtime.jsx(es5/* NavigationControl */.Pv, {})
          }), cyclistCounts.map(c => /*#__PURE__*/jsx_runtime.jsx(es5/* Marker */.Jx, {
            longitude: c.location.coordinates[1],
            latitude: c.location.coordinates[0],
            children: /*#__PURE__*/jsx_runtime.jsx("svg", {
              height: SIZE,
              viewBox: "0 0 24 24",
              style: {
                cursor: "pointer",
                fill: "#028083",
                stroke: "none",
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              },
              children: /*#__PURE__*/jsx_runtime.jsx("path", {
                d: ICON
              })
            })
          }, c._id))]
        }))
      })
    }), /*#__PURE__*/jsx_runtime.jsx("section", {
      className: "container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100",
      children: /*#__PURE__*/jsx_runtime.jsx(components_ContagensTable, {
        data: cyclistCounts
      })
    }), /*#__PURE__*/jsx_runtime.jsx("section", {
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex-1 container mx-auto p-10 text-center",
        children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
          className: "font-bold text-3xl text-ameciclo py-8 w-2/3 mx-auto",
          children: "Documentos para realizar contagens de ciclistas."
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "grid grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-1 gap-8 grid-flow-row",
          children: [/*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Planilha de Contagem",
            text: "Planilha que faz as contagens de fluxos e caracter\xEDsticas de ciclistas",
            icon: "ideciclo",
            url: "https://drive.google.com/uc?export=download&id=14D_Ly5GlX9toMKIy79Lsg4TcTQwI1vJP"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Planilha Auxiliar",
            text: "Planilha com os dados qualitativos para auxiliar na contagem.",
            icon: "relatorio",
            url: "https://drive.google.com/uc?export=download&id=1hEP6Dlqf6677LpCdnSyldAzoGTTrmGNT"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Planilha Eletr\xF4nica",
            text: "Planilha para compilar todos os dados e chegar \xE0s conclus\xF5es.",
            icon: "relatorio",
            url: "https://docs.google.com/spreadsheets/d/1KZUXJ_GkcEnu-ZBgEKkIMq2yRNCI0nRK7dlz2O9QqVs/edit#gid=2030770011"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Modelo de Relat\xF3rio",
            text: "Relat\xF3rio modelo para cada contagem de ciclistas.",
            icon: "relatorio",
            url: "https://drive.google.com/file/d/1SaisbxjoaKoG0cSAsWRgoRC5W6wgSx_r/view?usp=sharing"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Panfleto de instru\xE7\xF5es",
            text: "Panfleto informativo que mostra como as informa\xE7\xF5es devem ser marcadas.",
            icon: "contagem",
            url: "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4LURYY2o2Nml0TDA"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Instru\xE7\xF5es gerais",
            text: "Mais informa\xE7\xF5es acerca de como nossa contagem \xE9 realizada.",
            icon: "contagem",
            url: "https://drive.google.com/uc?export=download&id=0BzQ5vNvMmIF4emY5aENNWnJDZE9jRlVvU0VqTVpKMUFZemxV"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Manual da Transporte Ativo",
            text: "Manual de contagens fotogr\xE1ficas que baseou muitas das contagens no Brasil.",
            icon: "ideciclo",
            url: "http://transporteativo.org.br/contagens/manual_contagem_fotografica.pdf"
          }), /*#__PURE__*/jsx_runtime.jsx(GridCard, {
            title: "Manual do ITDP",
            text: "Recomenda\xE7\xF5es t\xE9cnicas e monitoramento atualizado para uniformiza\xE7\xE3o das contagens de ciclsitas.",
            icon: "relatorio",
            url: "http://itdpbrasil.org/wp-content/uploads/2018/10/Contagens-de-ciclistas_ITDP_out2018_v04.pdf"
          })]
        })]
      })
    })]
  });
};

async function getServerSideProps() {
  const globalSummaryRes = await fetch(`https://api.contagem.ameciclo.org/v1/cyclist-count/metadata`);
  const res = await fetch(`https://api.contagem.ameciclo.org/v1/cyclist-count/`);
  const cyclistCounts = await res.json();
  const globalSummary = await globalSummaryRes.json();
  return {
    props: {
      cyclistCounts: cyclistCounts.data,
      globalSummary: globalSummary.data
    }
  };
}
/* harmony default export */ var contagens = (Contagens);

/***/ }),

/***/ 1346:
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

      const compMod = __webpack_require__(4948)

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
        page: "/contagens",
        buildId: "Z6TwkfAjJbWNvakg093w-",
        escapedBuildId: "Z6TwkfAjJbWNvakg093w\-",
        basePath: "",
        pageIsDynamic: false,
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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [417,333,626,13,217,766,554,618,325,656], function() { return __webpack_require__(1346); })
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
/******/ 			689: 1
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
/******/ 					installChunk(require("../chunks/" + __webpack_require__.u(chunkId)));
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
/******/ 			__webpack_require__.e(626);
/******/ 			__webpack_require__.e(13);
/******/ 			__webpack_require__.e(217);
/******/ 			__webpack_require__.e(766);
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