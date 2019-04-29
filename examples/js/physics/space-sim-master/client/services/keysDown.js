/**
 * Exports an object describing which keys (and mouse buttons) are currently
 * pressed down, object has this structure:
 *
 * {
 *  ctrl: true,
 * 	a: false,
 * 	'left mouse button': true,
 * 	...
 * }
 */

// TODO: add "any" support
import keycode from 'keycode'

const mouseEventToString = e =>
  `${['left', 'middle', 'right'][e.which ? e.which - 1 : e.button]} mouse button`

const keysDown = {
  ..._.fromPairs(['left', 'middle', 'right'].map(v => [`${v} mouse button`, false])),
  ..._.mapValues(keycode.codes, () => false),
}

document.addEventListener('keydown', e => { keysDown[keycode(e)] = true })
document.addEventListener('keyup', e => { keysDown[keycode(e)] = false })
document.addEventListener('mousedown', e => { keysDown[mouseEventToString(e)] = true })
document.addEventListener('mouseup', e => { keysDown[mouseEventToString(e)] = false })

export default keysDown
