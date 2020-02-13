"use strict";

var _react = _interopRequireDefault(require("react"));

var _Stepper = _interopRequireDefault(require("app/components/atoms/Stepper/Stepper"));

var _enzyme = require("enzyme");

var _theme = _interopRequireDefault(require("app/themes/theme.default"));

var _ButtonIcon = _interopRequireDefault(require("app/components/molecules/ButtonIcon/ButtonIcon"));

var _styledComponents = require("styled-components");

require("jest-styled-components");

var _jestPluginContext = _interopRequireDefault(require("jest-plugin-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import Button from 'app/components/atoms/Button/Button';
// import renderer from 'react-test-renderer'
const props = {
  title: 'ABC',
  subTitle: 'XYZ',
  children: _react.default.createElement("div", null),
  step: 2,
  steps: 3,
  onClose: () => {},
  onStepChange: () => {}
};
describe('<Stepper />', () => {
  const shallowWithTheme = (tree, theme) => {
    const context = (0, _enzyme.shallow)(_react.default.createElement(_styledComponents.ThemeProvider, {
      theme: theme
    })).instance().getChildContext();
    return (0, _enzyme.shallow)(tree, {
      context
    });
  };

  describe('title', () => {
    it('should render title in Header Title Element', () => {
      const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
        title: "test title"
      })));
      expect(wrapper.find('HeaderTitle').children().text()).toEqual('test title');
    });
    it('should render title with h1 as a "as" prop ', () => {
      const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
        title: "test title"
      })));
      expect(wrapper.find('HeaderTitle').props().as).toEqual('h1');
    });
  });
  describe('subtitle', () => {
    it('should render subtitle in SubHeader Title Element', () => {
      const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
        subTitle: "test subtitle"
      })));
      expect(wrapper.find('HeaderSubTitle').children().text()).toEqual('test subtitle');
    });
    it('should render subtitle with h2 as a "as" prop', () => {
      const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
        subTitle: "test subtitle"
      })));
      expect(wrapper.find('HeaderSubTitle').props().as).toEqual('h2');
    });
  });
  describe('step', () => {
    (0, _jestPluginContext.default)('when step is more than 1', () => {
      it('should render the two button icon', () => {
        const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
          step: 2
        })));
        expect(wrapper.find(_ButtonIcon.default).length).toEqual(2);
      });
    });
    (0, _jestPluginContext.default)('when step is 1 or less', () => {
      it('should render the one button icon', () => {
        const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
          step: 1
        })));
        expect(wrapper.find(_ButtonIcon.default).length).toEqual(1);
      });
    });
  }); // describe('step and steps', () => {
  //     context('when step is less than steps', () => {
  //         it('should show the next button', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={3}/>);
  //             expect(wrapper.find('ButtonStyle').children().at(0).text()).toEqual('Next');
  //         });
  //
  //         it('should show the next icon component inside the button', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={3}/>);
  //             expect(wrapper.find('ButtonStyle').children().at(1).props().name).toEqual('chevron-right');
  //         });
  //     });
  //     context('when step is equal or greater than steps', () => {
  //         it('should show the Done button', () => {
  //             const wrapper = shallow(<Stepper {...props} step={4} steps={3}/>);
  //             expect(wrapper.find('ButtonStyle').children().text()).toEqual('Done');
  //         });
  //     });
  // });
  // describe('onStepChange', () => {
  //     // mock funtions
  //     describe('when clicking on next', () => {
  //         const clickFn = jest.fn();
  //         it('should call function once', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={3} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonStyle').simulate('click');
  //             expect(clickFn).toHaveBeenCalledTimes(1);
  //         });
  //         const event = {};
  //         it('should call the function and pass the argument next with event', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={3} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonStyle').simulate('click', event);
  //             expect(clickFn).toHaveBeenCalledWith('next', event);
  //         });
  //     });
  //     describe('when clicking on prev button', () => {
  //         const clickFn = jest.fn();
  //         it('should call function once', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonIcon').at(1).simulate('click');
  //             expect(clickFn).toHaveBeenCalledTimes(1);
  //         });
  //         const event = {};
  //         it('should call the function and pass the argument back with event', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonIcon').at(1).simulate('click', event);
  //             expect(clickFn).toHaveBeenCalledWith('back', event);
  //         });
  //     });
  //
  //     describe('when clicking on done button', () => {
  //         const clickFn = jest.fn();
  //         it('should call function once', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={2} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonStyle').simulate('click');
  //             expect(clickFn).toHaveBeenCalledTimes(1);
  //         });
  //         const event = {};
  //         it('should call the function and pass the argument next with event', () => {
  //             const wrapper = shallow(<Stepper {...props} step={2} steps={2} onStepChange={clickFn}/>);
  //             wrapper.find('ButtonStyle').simulate('click', event);
  //             expect(clickFn).toHaveBeenCalledWith('next', event);
  //         });
  //     });
  //
  // });

  describe('onClose', () => {
    const clickFn = jest.fn();
    it('should call function once   ', () => {
      const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
        step: 1,
        onClose: clickFn
      })));
      wrapper.find('ButtonIcon').simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
  it('show step status according to passed step and steps', () => {
    const wrapper = (0, _enzyme.shallow)(_react.default.createElement(_Stepper.default, _extends({}, props, {
      step: 2,
      steps: 3
    })));
    expect(wrapper.find('span.step-status').text()).toEqual('STEP 2 / 3');
  });
  it('renders a Stpper snapshot', () => {
    const wrapper = shallowWithTheme(_react.default.createElement(_Stepper.default, props), _theme.default);
    expect(wrapper).toMatchSnapshot();
  });
});