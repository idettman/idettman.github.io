/**
 * API wrapper for responding to keyboard events
 *
 * e.preventDefault() will only prevents the event bubbling to the browser,
 * itself so long as this API is used no other function calls should be
 * blocked - except perhaps some 3rd party libraries.
 */

// TODO: any support
import keycode from 'keycode'

const responses = {
  keydown: _.mapValues(keycode.codes, () => []),
  keyup: _.mapValues(keycode.codes, () => []),
}

_.mapValues(responses, (responseSet, evtName) =>
  window.addEventListener(evtName, e => {
    responseSet[keycode(e)].forEach(f => f(e))
  })
)

export default (_keys, f, evtName = 'keydown') => {
  const keys = _keys instanceof Array ? _keys : [_keys]
  keys.forEach(k => {
    if (!responses[evtName]) console.error(`${evtName} invalid. keyResponse supports "keyup" & "keydown" only.`)
    else responses[evtName][keycode(keycode(k))].push(f) // keycode(keycode(k)) is needed for aliases
  })
}
