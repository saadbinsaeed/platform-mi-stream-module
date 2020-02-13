"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateOutRight = exports.animateInRight = exports.animateOutTop = exports.animateInTop = void 0;

var _styledComponents = require("styled-components");

// Animate in from top
const animateInTopKeyframes = (0, _styledComponents.keyframes)(["from{transform:translateY(-100%);opacity:0;}to{transform:translateY(0px);opacity:1;}"]);
const animateOutTopKeyframes = (0, _styledComponents.keyframes)(["from{transform:translateY(0);opacity:1;}to{transform:translateY(-100%);opacity:0;}"]);
const animateInTop = (0, _styledComponents.css)(["", ";"], animateInTopKeyframes);
exports.animateInTop = animateInTop;
const animateOutTop = (0, _styledComponents.css)(["", ";"], animateOutTopKeyframes); // Animate in from right

exports.animateOutTop = animateOutTop;
const animateInRightKeyframes = (0, _styledComponents.keyframes)(["from{transform:translateX(100%);}to{transform:translateX(0px);}"]);
const animateOutRightKeyframes = (0, _styledComponents.keyframes)(["from{transform:translateX(0);}to{transform:translateX(100%);}"]);
const animateInRight = (0, _styledComponents.css)(["", ";"], animateInRightKeyframes);
exports.animateInRight = animateInRight;
const animateOutRight = (0, _styledComponents.css)(["", ";"], animateOutRightKeyframes);
exports.animateOutRight = animateOutRight;