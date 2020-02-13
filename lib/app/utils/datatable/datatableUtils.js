"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveText = exports.saveCsv = void 0;

var _jsonexport = _interopRequireDefault(require("jsonexport"));

var _moment = _interopRequireDefault(require("moment"));

var _fileSaver = _interopRequireDefault(require("file-saver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * download list of user
 * @param name is the filename to download
 * @param rows is the data object that download
 */
const saveCsv = (name, rows) => {
  if (rows && rows.length) {
    (0, _jsonexport.default)(rows, {
      headers: Object.keys(rows[0])
    }, (error, csv) => {
      if (error) {
        // eslint-disable-next-line no-console
        return console.log('[ExportCSV]', error);
      }

      ;
      const filename = `${name} ${(0, _moment.default)().format('DD.MM.YYYY HH.mm.ss')}.csv`;
      const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });

      _fileSaver.default.saveAs(blob, filename);
    });
  }
};
/**
 * download a text file
 * @param name is the filename to download
 * @param body is the body of the text file
 * @param ext is the extensions supported
 */


exports.saveCsv = saveCsv;

const saveText = (name, body, ext) => {
  if (body) {
    const filename = `${name} ${(0, _moment.default)().format('DD.MM.YYYY HH.mm.ss')}${ext}`;
    const blob = new Blob([body], {
      type: 'text/plain;charset=utf-8'
    });

    _fileSaver.default.saveAs(blob, filename);
  }
};

exports.saveText = saveText;