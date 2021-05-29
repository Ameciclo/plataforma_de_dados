/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3775:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ documentos; },
  "getStaticProps": function() { return /* binding */ getStaticProps; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./components/Layout.tsx + 2 modules
var Layout = __webpack_require__(2618);
// EXTERNAL MODULE: ./node_modules/next/head.js
var head = __webpack_require__(9008);
// EXTERNAL MODULE: ./components/Breadcrumb.tsx
var Breadcrumb = __webpack_require__(6325);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/DocumentCard.tsx





const DocTypeIndicator = ({
  type: docType
}) => {
  const typeMap = new Map([["studies", {
    name: "Estudos e pesquisas",
    color: "#008080",
    fontColor: "#581f0f"
  }], ["books", {
    name: "Livros",
    color: "#F6D55C",
    fontColor: "#581f0f"
  }], ["other", {
    name: "Outros",
    color: "#20639B",
    fontColor: "#dbf4c6"
  }]]);
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: "uppercase p-4 rounded bg-green-400 font-semibold absolute",
    style: {
      maxHeight: "50px",
      color: typeMap.get(docType).fontColor,
      backgroundColor: typeMap.get(docType).color,
      borderRadius: "0 0 15px 0",
      borderBottom: "0 none",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)"
    },
    children: typeMap.get(docType).name
  });
};

const DocumentCard = ({
  document
}) => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: "bg-white rounded-lg shadow ",
    style: {
      minHeight: "450px"
    },
    children: [/*#__PURE__*/jsx_runtime.jsx(DocTypeIndicator, {
      type: document.type
    }), document.cover ? /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
      href: `${document.url}`,
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        style: {
          backgroundImage: `url(${document.cover.url})`,
          minHeight: "400px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          cursor: "pointer"
        }
      })
    }) : /*#__PURE__*/jsx_runtime.jsx("div", {
      style: {
        minHeight: "270px"
      }
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "px-4 py-5 lg:p-6",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("dl", {
        className: "pb-6",
        children: [/*#__PURE__*/jsx_runtime.jsx(next_link.default, {
          href: `${document.url}`,
          children: /*#__PURE__*/(0,jsx_runtime.jsxs)("dt", {
            className: "mt-1 text-2xl font-semibold leading-9 text-gray-900 cursor-pointer",
            children: [document.title, " (", document.release_date.substr(0, 4), ")"]
          })
        }), /*#__PURE__*/jsx_runtime.jsx("dt", {
          className: "text-sm text-gray-600",
          style: {
            maxHeight: "100px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical"
          },
          children: document.description
        })]
      })
    })]
  });
};
;// CONCATENATED MODULE: ./pages/documentos.tsx




 //import SEO from "../components/SEO";




const Documentos = ({
  documents
}) => {
  const {
    0: filteredDocuments,
    1: setFilteredDocuments
  } = (0,react.useState)([]);
  const {
    0: docType,
    1: setDocType
  } = (0,react.useState)("");
  (0,react.useEffect)(() => {
    if (docType) {
      setFilteredDocuments(documents.filter(documents => {
        return documents.type === docType;
      }));
    } else {
      setFilteredDocuments(documents);
    }
  }, [docType, documents]);
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(Layout/* default */.Z, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)(head.default, {
      children: [/*#__PURE__*/jsx_runtime.jsx("title", {
        children: "Documentos | Plataforma de Dados"
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
        children: "Documentos e Estudos"
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: "bg-ameciclo text-white p-4 items-center uppercase flex",
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "container mx-auto",
        children: /*#__PURE__*/jsx_runtime.jsx(Breadcrumb/* default */.Z, {
          label: "Documentos",
          slug: "/documentos",
          routes: ["/", "/Documentos"]
        })
      })
    }), /*#__PURE__*/jsx_runtime.jsx("section", {
      className: "container mx-auto my-10 shadow-2xl rounded p-12 overflow-auto bg-gray-100",
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: "flex flex-col sm:flex-row justify-between",
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl",
          children: [/*#__PURE__*/jsx_runtime.jsx("h1", {
            className: "text-4xl font-bold mb-2",
            children: "O que s\xE3o?"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "A Ameciclo realizou e realiza diversas pesquisas ao longo de sua hist\xF3ria e documentamos todas elas nessa sess\xE3o. S\xE3o estudos, pesquisas, documentos t\xE9cnicos e livros acerca do perfil de quem pedala e de quem n\xE3o pedala no dia a dia, da qualidade da estrutura ciclovi\xE1ria, de contagem de ciclistas e de an\xE1lise da gest\xE3o p\xFAblica com rela\xE7\xE3o \xE0 mobilidade."
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "text-justify text-gray-800 sm:w-2/3 p-6 sm:max-w-2xl",
          children: [/*#__PURE__*/jsx_runtime.jsx("h1", {
            className: "text-4xl font-bold mb-2",
            children: "... e tem mais!"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "Tamb\xE9m guardamos aqui as pesquisas nas quais a Ameciclo contribuiu para serem realizadas, seja com o fornecimento de dados, seja por ser o objeto de pesquisa de estudantes nas universidades. \xC9 um orgulho conseguir contribuir com a ci\xEAncia e alavancar a ciclomobilidade. Se voc\xEA deseja ver nossos livros de hist\xF3rias l\xFAdicas, busque na sess\xE3o biblioteca (em breve)."
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("section", {
      className: "container my-12 mx-auto",
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: "mt-5 mx-3",
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: "inline-block relative w-64",
          children: [/*#__PURE__*/jsx_runtime.jsx("label", {
            htmlFor: "docType",
            children: "Selecione o tipo:"
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("select", {
            value: docType,
            name: "docType",
            className: "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline",
            onChange: e => setDocType(e.target.value),
            onBlur: e => e,
            children: [/*#__PURE__*/jsx_runtime.jsx("option", {
              value: "",
              children: "Todos"
            }), /*#__PURE__*/jsx_runtime.jsx("option", {
              value: "studies",
              children: "Estudos e pesquisas"
            }), /*#__PURE__*/jsx_runtime.jsx("option", {
              value: "books",
              children: "Livros"
            }), /*#__PURE__*/jsx_runtime.jsx("option", {
              value: "other",
              children: "Outros"
            })]
          })]
        })
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: "mt-5 mx-3 grid grid-cols-1 lg:grid-cols-4 gap-6",
        children: filteredDocuments.sort((a, b) => a.release_date > b.release_date ? -1 : 1).map(document => /*#__PURE__*/jsx_runtime.jsx(DocumentCard, {
          document: document
        }, document.id))
      })]
    })]
  });
};

async function getStaticProps() {
  //const res = await fetch("http://localhost:1337/documents");
  const res = await fetch("https://cms.ameciclo.org/documents");
  let documents = [];

  if (res.status === 200) {
    documents = await res.json();
  }

  return {
    props: {
      documents
    },
    revalidate: 1
  };
}
/* harmony default export */ var documentos = (Documentos);

/***/ }),

/***/ 7465:
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

      const compMod = __webpack_require__(3775)

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
        page: "/documentos",
        buildId: "Z6TwkfAjJbWNvakg093w-",
        escapedBuildId: "Z6TwkfAjJbWNvakg093w\-",
        basePath: "",
        pageIsDynamic: false,
        encodedPreviewProps: {previewModeId:"4ea9070f1495f62611deff951fcbcfa5",previewModeSigningKey:"e6f7cd086541dc82b0aed2fc504c93e82f0e3bb17441d306352ce8afda035f4f",previewModeEncryptionKey:"492caa373333eeefe29bd09bda42ec592b1c50da583ebc3f1ee5cf9bccac1f0b"}
      })
      
    

/***/ }),

/***/ 7294:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



if (true) {
  module.exports = __webpack_require__(2408);
} else {}


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [417,333,554,618,325], function() { return __webpack_require__(7465); })
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
/******/ 			495: 1
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
/******/ 			__webpack_require__.e(554);
/******/ 			__webpack_require__.e(618);
/******/ 			__webpack_require__.e(325);
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