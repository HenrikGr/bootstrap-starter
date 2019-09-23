
/**
 * Constants
 * @type {string}
 */
const NAME                = 'flip'
const VERSION             = '1.0.0'
const DATA_KEY            = 'custom.flip'
const EVENT_KEY           = `.${DATA_KEY}`
const DATA_API_KEY        = '.data-api'
const JQUERY_NO_CONFLICT  = $.fn[NAME]

/**
 * Class names
 * @type {{CONTAINER: string, TRANSFORM: string}}
 */
const ClassName = {
  CONTAINER: 'flip-container',
  TRANSFORM: 'flip'
}

/**
 * Selectors
 * @type {{CONTAINER: string}}
 */
const Selector = {
  CONTAINER: '.flip-container',
}

/**
 * Custom events
 * @type {{CLICK_DATA_API: string}}
 */
const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`
}

/**
 * Flip constructor
 * @param element
 * @constructor
 */
function Flip(element) {
  this._element = element || ClassName.CONTAINER
  Flip.VERSION = VERSION
}

/**
 * Toggle method
 */
Flip.prototype.toggle = function() {
  $(this._element).toggleClass(ClassName.TRANSFORM)
}

/**
 * Dispose method
 */
Flip.prototype.dispose = function() {
  $.removeData(this._element, DATA_KEY)
  this._element = null
}

/**
 * Static interface
 * @param config
 * @returns {*|jQuery}
 * @private
 */
Flip._jQueryInterface = function (config) { //static method
  return this.each(function() {
    // Get data for the instance
    let data = $(this).data(DATA_KEY)


    // If no data for the instance, ie no flip component being instantiated,
    // create a new instance and set data api on the component
    if (!data) {
      data = new Flip(this)
      $(this).data(DATA_KEY, data)
    }

    if (config === 'toggle') {
      data.toggle()
    }
  })
}



/**
 * Data Api implementation
 */

/**
 * OnClick event handler, uses a static method to call the component
 * interface. If no component has been instantiated, the static interface will do
 */
$(document).on(Event.CLICK_DATA_API, Selector.CONTAINER, event => {
  event.preventDefault()
  Flip._jQueryInterface.call($(Selector.CONTAINER), 'toggle')
})

/**
 * jQuery
 */
$.fn[NAME] = Flip._jQueryInterface
$.fn[NAME].Constructor = Flip
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Flip._jQueryInterface
}

export default Flip
