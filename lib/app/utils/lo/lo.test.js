"use strict";

var _Immutable = _interopRequireDefault(require("app/utils/immutable/Immutable"));

var _lo = require("./lo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('isDefined', () => {
  test('pass a null object to isDefined', () => {
    expect((0, _lo.isDefined)(null)).toBeFalsy();
  });
  test('pass undefined to isDefined', () => {
    expect((0, _lo.isDefined)()).toBeFalsy();
    expect((0, _lo.isDefined)(undefined)).toBeFalsy();
  });
  test('pass 0 to isDefined', () => {
    expect((0, _lo.isDefined)(0)).toBeTruthy();
  });
  test('pass 1 to isDefined', () => {
    expect((0, _lo.isDefined)(1)).toBeTruthy();
  });
  test('pass false to isDefined', () => {
    expect((0, _lo.isDefined)(false)).toBeTruthy();
  });
  test('pass tre to isDefined', () => {
    expect((0, _lo.isDefined)(true)).toBeTruthy();
  });
  test('pass a date to isDefined', () => {
    expect((0, _lo.isDefined)(new Date())).toBeTruthy();
  });
  test('pass a string to isDefined', () => {
    expect((0, _lo.isDefined)('')).toBeTruthy();
    expect((0, _lo.isDefined)('test')).toBeTruthy();
  });
});
describe('set', () => {
  describe('set._getPath', () => {
    test('a', () => {
      expect(_lo.set._getPath('a')).toEqual(['a']);
    });
    test('a.b', () => {
      expect(_lo.set._getPath('a.b')).toEqual(['a', 'b']);
    });
    test('a.b[0]', () => {
      expect(_lo.set._getPath('a.b[0]')).toEqual(['a', 'b', 0]);
    });
    test('a.b[0][3]', () => {
      expect(_lo.set._getPath('a.b[0][3]')).toEqual(['a', 'b', 0, 3]);
    });
    test('a.b[0][3].c.3', () => {
      expect(_lo.set._getPath('a.b[0][3].c.3')).toEqual(['a', 'b', 0, 3, 'c', '3']);
    });
  });
  test('simple set', () => {
    const state = (0, _Immutable.default)({
      a: true,
      b: [1, 2, 'three'],
      c: {
        d: 'e'
      }
    });
    const updated = (0, _lo.set)(state, 'c.d', 'f');
    expect(updated).toEqual({
      a: true,
      b: [1, 2, 'three'],
      c: {
        d: 'f'
      }
    });
    expect(Object.isFrozen(updated));
  });
  test('autovivification', () => {
    const state = (0, _Immutable.default)({
      a: true,
      b: [1, 2, 'three'],
      c: {
        d: 'e'
      }
    });
    const updated = (0, _lo.set)(state, 'c.x.y.z', 123);
    expect(updated).toEqual({
      a: true,
      b: [1, 2, 'three'],
      c: {
        d: 'e',
        x: {
          y: {
            z: 123
          }
        }
      }
    });
    expect(Object.isFrozen(updated));
  });
  test('autovivification of an empty object', () => {
    const state = (0, _Immutable.default)({});
    const updated = (0, _lo.set)(state, 'b.c', 123);
    expect(updated).toEqual({
      b: {
        c: 123
      }
    });
    expect(Object.isFrozen(updated));
  });
  test('autovivification of a null object', () => {
    let updated = (0, _lo.set)(null, 'b.c', 123);
    expect(updated).toEqual({
      b: {
        c: 123
      }
    });
    expect(Object.isFrozen(updated));
    updated = (0, _lo.set)(undefined, 'd', 'ok');
    expect(updated).toEqual({
      d: 'ok'
    });
    expect(Object.isFrozen(updated));
  });
  describe('using array', () => {
    test('empty array', () => {
      const state = (0, _Immutable.default)([]);
      const updated = (0, _lo.set)(state, '[0].name', 'luca');
      expect(Object.isFrozen(updated));
      expect(updated).toEqual([{
        name: 'luca'
      }]);
    });
    test('simple array', () => {
      const state = (0, _Immutable.default)(['a', 'b']);
      const updated = (0, _lo.set)(state, '[1]', 'muted');
      expect(Object.isFrozen(updated));
      expect(updated).toEqual(['a', 'muted']);
    });
    test('replace an item', () => {
      const state = (0, _Immutable.default)({
        a: {
          b: [1, 2, 'three']
        }
      });
      const updated = (0, _lo.set)(state, 'a.b[2]', 123);
      expect(Object.isFrozen(updated));
      expect(updated).toEqual({
        a: {
          b: [1, 2, 123]
        }
      });
    });
    test('add an item', () => {
      const state = (0, _Immutable.default)({
        a: {
          b: [1, 2, 'three']
        }
      });
      const updated = (0, _lo.set)(state, 'a.b[4]', 123);
      expect(Object.isFrozen(updated));
      expect(updated).toEqual({
        a: {
          b: [1, 2, 'three', undefined, 123]
        }
      });
    });
    test('update a property of an item of the array', () => {
      const state = (0, _Immutable.default)({
        a: {
          b: [1, 2, {
            nested: {
              ready: false,
              type: 'x'
            }
          }]
        }
      });
      const updated = (0, _lo.set)(state, 'a.b[2].nested.ready', true);
      expect(Object.isFrozen(updated));
      expect(updated).toEqual({
        a: {
          b: [1, 2, {
            nested: {
              ready: true,
              type: 'x'
            }
          }]
        }
      });
    });
    test('multidimensional array', () => {
      const state = (0, _Immutable.default)({
        a: {
          b: [1, 2, [{
            nested: {
              ready: false,
              type: 'x'
            }
          }]]
        }
      });
      const updated = (0, _lo.set)(state, 'a.b[2][0].nested.ready', true);
      expect(Object.isFrozen(updated));
      expect(updated).toEqual({
        a: {
          b: [1, 2, [{
            nested: {
              ready: true,
              type: 'x'
            }
          }]]
        }
      });
    });
  });
});
describe('get', () => {
  test('pass a null object to the get', () => {
    expect((0, _lo.get)(null, 'a.b[0].c')).toBeUndefined();
  });
  test('pass an undefined object to the get', () => {
    expect((0, _lo.get)(undefined, 'a.b[0].c')).toBeUndefined();
  });
  test('get a null value', () => {
    expect((0, _lo.get)({
      a: {
        b: [{
          c: null
        }]
      }
    }, 'a.b[0].c')).toBeNull();
  });
  test('get an undefined value', () => {
    expect((0, _lo.get)({
      a: {
        b: [{
          c: undefined
        }]
      }
    }, 'a.b[0].c')).toBeUndefined();
  });
  test('get a boolean', () => {
    expect((0, _lo.get)({
      a: {
        b: [{
          c: true
        }]
      }
    }, 'a.b[0].c')).toBeTruthy();
    expect((0, _lo.get)({
      a: {
        b: [{
          c: false
        }]
      }
    }, 'a.b[0].c')).toBeFalsy();
  });
  test('get a number', () => {
    expect((0, _lo.get)({
      a: -1
    }, 'a')).toEqual(-1);
    expect((0, _lo.get)({
      a: 0
    }, 'a')).toEqual(0);
    expect((0, _lo.get)({
      a: 120
    }, 'a')).toEqual(120);
  });
  test('get an object', () => {
    expect((0, _lo.get)([{
      a: -1
    }], '[0]')).toEqual({
      a: -1
    });
    expect((0, _lo.get)([{
      i: {
        a: 0
      }
    }], '[0].i')).toEqual({
      a: 0
    });
    expect((0, _lo.get)([{}, {
      a: 120
    }], '[1]')).toEqual({
      a: 120
    });
  });
});
describe('keyBy', () => {
  test('pass a null object to the keyBy', () => {
    expect((0, _lo.keyBy)(null, 'id')).toEqual({});
  });
  test('pass an undefined object to the keyBy', () => {
    expect((0, _lo.keyBy)(undefined, 'id')).toEqual({});
  });
  test('keyBy a proper key', () => {
    expect((0, _lo.keyBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'dir': 'right',
      'code': 100
    }], 'dir')).toEqual({
      'left': {
        'dir': 'left',
        'code': 97
      },
      'right': {
        'dir': 'right',
        'code': 100
      }
    });
  });
  test('keyBy a bad key', () => {
    expect((0, _lo.keyBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'dir': 'right',
      'code': 100
    }], 'id')).toEqual({});
  });
  test('keyBy: an element does not contains the key', () => {
    expect((0, _lo.keyBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'id': 'right',
      'code': 100
    }], 'dir')).toEqual({
      'left': {
        'dir': 'left',
        'code': 97
      }
    });
  });
});
describe('groupBy', () => {
  test('undefined collection', () => {
    expect((0, _lo.groupBy)(undefined, 'id')).toEqual({});
    expect((0, _lo.groupBy)(null, 'id')).toEqual({});
  });
  test('groupBy a proper key', () => {
    expect((0, _lo.groupBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'dir': 'right',
      'code': 100
    }, {
      'dir': 'left',
      'code': 111
    }], 'dir')).toEqual({
      'left': [{
        'dir': 'left',
        'code': 97
      }, {
        'dir': 'left',
        'code': 111
      }],
      'right': [{
        'dir': 'right',
        'code': 100
      }]
    });
  });
  test('groupBy a bad key', () => {
    expect((0, _lo.groupBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'dir': 'right',
      'code': 100
    }], 'id')).toEqual({
      'undefined': [{
        'dir': 'left',
        'code': 97
      }, {
        'dir': 'right',
        'code': 100
      }]
    });
  });
  test('groupBy: an element does not contains the key', () => {
    expect((0, _lo.groupBy)([{
      'dir': 'left',
      'code': 97
    }, {
      'id': 'right',
      'code': 100
    }], 'dir')).toEqual({
      'left': [{
        'dir': 'left',
        'code': 97
      }],
      'undefined': [{
        'id': 'right',
        'code': 100
      }]
    });
  });
});
describe('map', () => {
  const mapFunc = ({
    id,
    name
  }, index) => ({
    id,
    name: name || '_no_value_',
    key: index
  });

  test('undefined collection', () => {
    expect((0, _lo.map)(undefined, mapFunc)).toEqual([]);
    expect((0, _lo.map)(null, mapFunc)).toEqual([]);
  });
  const list = [{
    'name': 'left',
    'id': 97
  }, {
    'name': 'right',
    'id': 100
  }, {
    'id': 111
  }];
  test('map an array', () => {
    expect((0, _lo.map)(list, mapFunc)).toEqual([{
      id: 97,
      name: 'left',
      key: 0
    }, {
      id: 100,
      name: 'right',
      key: 1
    }, {
      id: 111,
      name: '_no_value_',
      key: 2
    }]);
  });
  const obj = {
    f1: {
      'name': 'left',
      'id': 97
    },
    f2: {
      'name': 'right',
      'id': 100
    },
    f3: {
      'id': 111
    }
  };
  test('map an object', () => {
    expect((0, _lo.map)(obj, mapFunc)).toEqual([{
      id: 97,
      name: 'left',
      key: 'f1'
    }, {
      id: 100,
      name: 'right',
      key: 'f2'
    }, {
      id: 111,
      name: '_no_value_',
      key: 'f3'
    }]);
  });
});
describe('sortBy', () => {
  const x = [{
    'order_no': '0',
    'name': 'name',
    'f_uri': 'bj5/name',
    'id': 'bj5/name',
    'type': 'text'
  }, {
    'order_no': '1',
    'name': 'age',
    'f_uri': 'bj5/age',
    'id': 'bj5/age',
    'type': 'int'
  }, {
    'order_no': '2',
    'name': 'surname',
    'f_uri': 'bj5/surname',
    'id': 'bj5/surname',
    'type': 'text'
  }, {
    'order_no': '3',
    'name': 'score',
    'f_uri': 'bj5/score',
    'id': 'bj5/score',
    'type': 'int'
  }];
  const y = [{
    'order_no': '0',
    'name': 'name',
    'f_uri': 'bj5/name',
    'id': 'bj5/name',
    'type': 'text'
  }, {
    'order_no': '2',
    'name': 'surname',
    'f_uri': 'bj5/surname',
    'id': 'bj5/surname',
    'type': 'text'
  }, {
    'order_no': '3',
    'name': 'score',
    'f_uri': 'bj5/score',
    'id': 'bj5/score',
    'type': 'int'
  }, {
    'order_no': '1',
    'name': 'age',
    'f_uri': 'bj5/age',
    'id': 'bj5/age',
    'type': 'int'
  }];
  test('undefined collection', () => {
    expect((0, _lo.sortBy)(undefined, 'order_no')).toEqual([]);
    expect((0, _lo.sortBy)(null, 'order_no')).toEqual([]);
  });
  test('compare using a field value (order_no)', () => {
    expect((0, _lo.sortBy)(x, 'order_no')).toEqual([{
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }]);
    expect((0, _lo.sortBy)(y, 'order_no')).toEqual([{
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }]);
  });
  test('compare using two fields (type, name)', () => {
    expect((0, _lo.sortBy)(x, ['type', 'name'])).toEqual([{
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }, {
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }]);
    expect((0, _lo.sortBy)(y, ['type', 'name'])).toEqual([{
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }, {
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }]);
  });
  test('compare using a getter function', () => {
    expect((0, _lo.sortBy)(x, field => parseInt(field.order_no, 10))).toEqual([{
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }]);
    expect((0, _lo.sortBy)(y, field => parseInt(field.order_no, 10))).toEqual([{
      'order_no': '0',
      'name': 'name',
      'f_uri': 'bj5/name',
      'id': 'bj5/name',
      'type': 'text'
    }, {
      'order_no': '1',
      'name': 'age',
      'f_uri': 'bj5/age',
      'id': 'bj5/age',
      'type': 'int'
    }, {
      'order_no': '2',
      'name': 'surname',
      'f_uri': 'bj5/surname',
      'id': 'bj5/surname',
      'type': 'text'
    }, {
      'order_no': '3',
      'name': 'score',
      'f_uri': 'bj5/score',
      'id': 'bj5/score',
      'type': 'int'
    }]);
  });
});