import keyResponse from '_utils/interaction/keyResponse'
import store from 'store'

let refocusSceneOnCtrlKeyUp = false
keyResponse('ctrl', () => {
  if (store.getState().meta.sceneIsFocussed) {
    store.dispatch('UNFOCUS_SCENE')
    refocusSceneOnCtrlKeyUp = true
  }
})

keyResponse('ctrl', () => {
  if (refocusSceneOnCtrlKeyUp) {
    store.dispatch('FOCUS_SCENE')
    refocusSceneOnCtrlKeyUp = false
  }
}, 'keyup')

document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement) store.dispatch('UNFOCUS_SCENE')
})
