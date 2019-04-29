/**
 * For responding to events that bubble to the top
 */

import store from 'store'
import './sceneFocus'

document.addEventListener('mousemove', ({movementX, movementY}) => {
  if (store.getState().meta.sceneIsFocussed) {
    store.dispatch(
      'UPDATE_CAMERA_ROTATION',
      {deltaX: movementX, deltaY: movementY}
    )
  }
})
