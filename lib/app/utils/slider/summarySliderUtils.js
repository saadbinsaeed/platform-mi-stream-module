"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sliderSettings = void 0;

/* flow */
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  draggable: true,
  responsive: [{
    breakpoint: 800,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }, {
    breakpoint: 1200,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 1600,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  }, {
    breakpoint: 10000,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4
    }
  }]
};
exports.sliderSettings = sliderSettings;