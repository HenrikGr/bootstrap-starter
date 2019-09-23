//JQuery Module Pattern
import dom from './events'
console.log(dom)

const app = {
  init: () => {
    let emitter = new dom.Events()
    emitter.on('tick', number => {
      console.log(number)
    })

    emitter.emit('tick', 1)
    console.log('Started again', window.$)
  },
  test: function() {
    console.log('test')
  }
}



/**
 * Bootstrap app
 */
$('document').ready(function() {
  app.init()
})
