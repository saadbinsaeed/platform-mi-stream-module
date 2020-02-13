"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("app/utils/utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const API_KEY = 'AIzaSyBn4zixY8-GRFxLxifzO2jyrrqCRW4qn7Q';
const GOOGLE_API = 'https://maps.google.com/maps/api/geocode/json';
/**
 *
 */

class GeoCoding {
  constructor() {
    _defineProperty(this, "fromLatLong", async (lat, lng, apiKey = API_KEY) => {
      if (!(0, _utils.isDefined)(lat) || !(0, _utils.isDefined)(lng)) {
        return Promise.reject(new Error('Provided coordinates are invalid'));
      }

      const latLng = `${lat},${lng}`;
      let url = `${GOOGLE_API}?latlng=${encodeURI(latLng)}`;
      url += `&key=${apiKey}`;
      return this.handleUrl(url);
    });

    _defineProperty(this, "fromAddress", async (address, apiKey = API_KEY) => {
      if (!address) {
        return Promise.reject(new Error('Provided address is invalid'));
      }

      let url = `${GOOGLE_API}?address=${encodeURI(address)}`;
      url += `&key=${apiKey}`;
      return this.handleUrl(url);
    });

    _defineProperty(this, "handleUrl", async url => {
      const response = await fetch(url).catch(error => Promise.reject(new Error('Error fetching data')));
      const json = await response.json().catch(() => {
        return Promise.reject(new Error('Error parsing server response'));
      });

      if (json.status === 'OK') {
        return json;
      }

      return Promise.reject(new Error(`Server returned status code ${json.status}`));
    });

    _defineProperty(this, "getCurrentLocation", (onSuccess, onError) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }
    });

    _defineProperty(this, "convertDMSToDD", (degrees = 0, minutes = 0, seconds = 0, direction) => {
      let dd = (degrees || 0) + (minutes || 0) / 60 + (seconds || 0) / (60 * 60);

      if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
      }

      return dd;
    });

    _defineProperty(this, "convertDDtoDMS", (name, dd) => {
      const degrees = parseInt(dd, 10);
      const minutes = parseInt((dd - degrees) * 60, 10); // const seconds = parseInt((dd - degrees - minutes / 60) * 3600, 10);

      const seconds = (dd - degrees - minutes / 60) * 3600;
      let direction = '';
      if (name === 'latitude') direction = dd > 0 ? 'N' : 'S';
      if (name === 'longitude') direction = dd > 0 ? 'E' : 'W';
      return {
        degrees: Math.abs(degrees),
        minutes: Math.abs(minutes),
        seconds: Math.abs(seconds),
        direction
      };
    });

    _defineProperty(this, "getAddress", (address_components = []) => {
      const address = {
        province: '',
        city: '',
        country: '',
        code: '',
        line1: '',
        line2: ''
      };
      if (!address_components.length) return address;
      address_components.forEach(({
        types,
        long_name
      }) => {
        if (types.includes('administrative_area_level_1')) address.province = long_name;
        if (types.includes('administrative_area_level_2')) address.city = long_name;
        if (types.includes('country')) address.country = long_name.toUpperCase();
        if (types.includes('postal_code')) address.code = long_name;
        if (types.includes('sublocality') || types.includes('locality')) address.line2 = address.line2 ? `${address.line2} ${long_name}` : long_name;
        if (types.includes('street_number') || types.includes('route')) address.line1 = address.line1 ? `${address.line1} ${long_name}` : long_name;
      });
      return address;
    });

    _defineProperty(this, "isValidLatitute", latitude => {
      const patt = new RegExp('^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,15})?))$');

      if (!patt.test(String(latitude))) {
        return false;
      }

      return true;
    });

    _defineProperty(this, "isValidLongitute", longitude => {
      const patt = new RegExp('^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,15})?))$');

      if (!patt.test(String(longitude))) {
        return false;
      }

      return true;
    });
  }

}

const Geocode = new GeoCoding();
var _default = Geocode;
exports.default = _default;