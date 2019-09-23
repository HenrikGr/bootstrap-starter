"use strict";

(function(exports) {

  /**
   * Interface for event subscription.
   * @alias NanoEvents
   * @class
   */
  exports.Events = function () {
    this.events = {}
  }

  /**
   * Calls each of the listeners registered for a given event.
   * @param {string} event The event name.
   * @param {...*} arguments The arguments for listeners.
   * @return {undefined}
   *
   * @example
   * ee.emit('tick', tickType, tickDuration)
   *
   * @alias NanoEvents#emit
   * @method
   */
  exports.Events.prototype.emit = function(event) {
    let args = [].slice.call(arguments, 1)
      // Array.prototype.call() returns empty array if context is not array-like
    ;[].slice.call(this.events[event] || []).filter(function (i) {
      i.apply(this, args) // this === global or window
    })
  }

  /**
   * Add a listener for a given event.
   * @param {string} event The event name.
   * @param {function} cb The listener function.
   * @return {function} Unbind listener from event.
   * @example
   * const unbind = ee.on('tick', (tickType, tickDuration) => {
   *   count += 1
   * })
   *
   * disable () {
   *   unbind()
   * }
   * @alias NanoEvents#on
   * @method
   */
  exports.Events.prototype.on = function(event, cb) {
    if (process.env.NODE_ENV !== 'production' && typeof cb !== 'function') {
      throw new Error('Listener must be a function')
    }

    (this.events[event] = this.events[event] || []).push(cb)

    return function () {
      this.events[event] = this.events[event].filter(function (i) {
        return i !== cb
      })
    }.bind(this)
  }

}(typeof exports === "undefined" ? (this.dom = {}) : exports));

