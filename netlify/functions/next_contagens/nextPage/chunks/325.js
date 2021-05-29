exports.id = 325;
exports.ids = [325];
exports.modules = {

/***/ 6325:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);





const Breadcrumb = ({
  label,
  slug,
  routes
}) => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
    className: "bg-grey-light rounded font-sans w-full",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ol", {
      className: "list-none p-0 inline-flex max-w-full",
      children: routes.map((route, i) => {
        if (route === "/") {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BreadcrumbItem, {
            slug: "/",
            label: "Plataforma de Dados",
            lastItem: false
          }, i);
        }

        if (i === routes.length - 1) {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BreadcrumbItem, {
            slug: slug,
            label: label,
            lastItem: true
          }, i);
        }

        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(BreadcrumbItem, {
          slug: route,
          label: route,
          lastItem: false
        }, i);
      })
    })
  });
};

const BreadcrumbItem = ({
  slug,
  label,
  lastItem
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
    className: `flex items-center ${lastItem ? "last-breadcrumb" : ""}`,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__.default, {
      href: slug,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
        className: "truncate",
        children: label.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      })
    }), lastItem ? null : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
      className: "fill-current w-3 h-3 mx-3",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 320 512",
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
        d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
      })
    })]
  });
};

/* harmony default export */ __webpack_exports__["Z"] = (Breadcrumb);

/***/ })

};
;