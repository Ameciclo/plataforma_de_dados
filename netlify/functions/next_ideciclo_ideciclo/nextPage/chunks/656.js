exports.id = 656;
exports.ids = [656];
exports.modules = {

/***/ 1656:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);




const InfoCard = ({
  label,
  data,
  style,
  icon
}) => {
  let percent = data * 100;
  let text = `${percent.toLocaleString("pt-BR", {
    maximumFractionDigits: 1
  })}%`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `${style === "ameciclo" ? "bg-ameciclo text-white" : "bg-white text-gray-800"} h-32 rounded shadow-2xl p-3 uppercase tracking-widest flex justify-between flex-col sm:flex-row`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: "hidden sm:block",
        children: label
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
        className: "text-center sm:text-left text-base sm:text-5xl font-bold",
        children: text
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
      src: `/icons/${icon}.svg`,
      className: "h-20 fill-current"
    })]
  });
};

InfoCard.defaultProps = {
  style: "default",
  icon: "women"
};
/* harmony default export */ __webpack_exports__["Z"] = (InfoCard);

/***/ })

};
;