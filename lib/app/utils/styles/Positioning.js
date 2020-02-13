"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.perpendicularAxis = exports.perpendicularOpposite = exports.perpendicular = exports.opposite = void 0;

var _styledComponents = require("styled-components");

var _styledTheme = require("styled-theme");

var _styledTools = require("styled-tools");

const opposites = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right'
};

const opposite = ({
  position
}) => opposites[position];

exports.opposite = opposite;

const perpendicular = ({
  position
}) => position === 'left' || position === 'right' ? 'top' : 'left';

exports.perpendicular = perpendicular;

const perpendicularOpposite = props => opposites[perpendicular(props)];

exports.perpendicularOpposite = perpendicularOpposite;

const perpendicularAxis = ({
  position
}) => position === 'left' || position === 'right' ? 'Y' : 'X';

exports.perpendicularAxis = perpendicularAxis;
const backgroundColor = (0, _styledTools.ifProp)('reverse', 'rgba(255, 255, 255, 0.85)', 'rgba(0, 0, 0, 0.85)');
const Positioning = (0, _styledComponents.css)(["position:relative;&:before,&:after{position:absolute;pointer-events:none;display:block;opacity:0;transition:opacity 100ms ease-in-out,", " 100ms ease-in-out;will-change:", ";}&:hover:before,&:focus:before{opacity:1;", ":calc(100% + 1rem);}&:hover:after,&:focus:after{opacity:1;", ":100%;}&:before{content:attr(data-title);font-family:", ";white-space:nowrap;text-transform:none;font-size:0.8125rem;line-height:1.5;text-align:center;color:", ";background-color:", ";border-radius:0.15384em;padding:0.75em 1em;", ":calc(100% + 2rem);", "}&:after{", ":calc(100% + 1rem);", ":50%;border:solid transparent;content:'';height:0;width:0;border-", "-color:", ";border-width:0.5rem;margin-", ":-0.5rem;}"], opposite, opposite, opposite, opposite, (0, _styledTheme.font)('primary'), (0, _styledTools.ifProp)('reverse', 'black', 'white'), backgroundColor, opposite, ({
  align
}) => {
  switch (align) {
    case 'start':
      return (0, _styledComponents.css)(["", ":0;"], perpendicular);

    case 'center':
      return (0, _styledComponents.css)(["", ":50%;transform:translate", "(-50%);"], perpendicular, perpendicularAxis);

    default:
      return (0, _styledComponents.css)(["", ":0;"], perpendicularOpposite);
  }
}, opposite, perpendicular, ({
  position
}) => position, backgroundColor, perpendicular);
var _default = Positioning;
exports.default = _default;