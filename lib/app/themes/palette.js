"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.materialColorPalette = void 0;
const materialColorPalette = [['#b71c1c', '#c62828', '#d32f2f', '#e53935', '#f44336', '#ef5350'], ['#880E4F', '#AD1457', '#C2185B', '#D81B60', '#E91E63', '#EC407A'], ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA', '#9C27B0', '#AB47BC'], ['#311B92', '#4527A0', '#512DA8', '#5E35B1', '#673AB7', '#7E57C2'], ['#1A237E', '#283593', '#303F9F', '#3949AB', '#3F51B5', '#5C6BC0'], ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3', '#42A5F5'], ['#01579B', '#0277BD', '#0288D1', '#039BE5', '#03A9F4', '#29B6F6'], ['#006064', '#00838F', '#0097A7', '#00ACC1', '#00BCD4', '#26C6DA'], ['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A'], ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#4CAF50', '#66BB6A'], ['#33691E', '#558B2F', '#689F38', '#7CB342', '#8BC34A', '#9CCC65'], ['#827717', '#9E9D24', '#AFB42B', '#C0CA33', '#CDDC39', '#D4E157'], ['#F57F17', '#F9A825', '#FBC02D', '#FDD835', '#FFEB3B', '#FFEE58'], ['#FF6F00', '#FF8F00', '#FFA000', '#FFB300', '#FFC107', '#FFCA28'], ['#E65100', '#EF6C00', '#F57C00', '#FB8C00', '#FF9800', '#FFA726'], ['#BF360C', '#D84315', '#E64A19', '#F4511E', '#FF5722', '#FF7043']];
exports.materialColorPalette = materialColorPalette;
const colorPalette = {
  primary: ['#00a99d', '#00c3b5'],
  secondary: ['#066ab1', '#0779ca'],
  info: ['#4FC3F7', '#67cbf8'],
  success: ['#81C784', '#93cf95'],
  warning: ['#FF8A65', '#ff9d7f'],
  alert: ['#FFB74D', '#ffc167'],
  danger: ['#e57373', '#e98989'],
  error: ['#dd4747', '#e15d5d'],
  white: ['#FFFFFF'],
  grey: ['#fff', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242'],
  red: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c'],
  pink: ['#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F'],
  purple: ['#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC'],
  deepPurple: ['#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92'],
  indigo: ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
  blue: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
  lightBlue: ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
  cyan: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064'],
  teal: ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
  green: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20'],
  lightGreen: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
  lime: ['#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717'],
  yellow: ['#FFFDE7', '#FFF9C4', 'FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
  amber: ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00'],
  orange: ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
  deepOrange: ['#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C'],
  brown: ['#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723'],
  blueGrey: ['#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238']
};
var _default = colorPalette;
exports.default = _default;