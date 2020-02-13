"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// WARNING: flow here brakes :(

/**
 * Defines the routes for the Broadcasts views
 */
class StateHistoryManager {
  /**
   *  Constructor of StateHistoryManager
   */
  constructor(_currentState) {
    _defineProperty(this, "dataPast", []);

    _defineProperty(this, "dataFuture", []);

    _defineProperty(this, "currentState", {});

    _defineProperty(this, "canUndo", false);

    _defineProperty(this, "canRedo", false);

    _defineProperty(this, "push", currentState => {
      if (currentState !== this.currentState) {
        this.dataPast = [this.currentState, ...this.dataPast];
        this.canUndo = this.dataPast.length > 0;
        this.canRedo = this.dataFuture.length > 0;
        this.currentState = currentState || {};
      }
    });

    _defineProperty(this, "undo", currentState => {
      const [previous, ...dataPast] = this.dataPast;
      this.dataPast = dataPast;
      this.dataFuture = [currentState, ...this.dataFuture];
      this.canUndo = this.dataPast.length > 0;
      this.canRedo = this.dataFuture.length > 0;
      this.currentState = previous;
      return previous;
    });

    _defineProperty(this, "redo", currentState => {
      this.dataPast = [currentState, ...this.dataPast];
      const [next, ...dataFuture] = this.dataFuture;
      this.dataFuture = dataFuture;
      this.canUndo = this.dataPast.length > 0;
      this.canRedo = this.dataFuture.length > 0;
      this.currentState = next;
      return next;
    });

    this.currentState = _currentState;
  }

}

exports.default = StateHistoryManager;