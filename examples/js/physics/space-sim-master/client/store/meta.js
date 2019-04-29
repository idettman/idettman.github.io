import {createReducer, loop} from '_utils/redux-plus'

export default createReducer({
  TICK: state => ({
    ...state,
    age: state.age + 1,
  }),
  FOCUS_SCENE: state => loop(
    {
      ...state,
      sceneIsFocussed: true,
    },
    () => {
      document.getElementById('scene').requestPointerLock()
      return null
    }
  ),
  UNFOCUS_SCENE: state => loop(
    {
      ...state,
      sceneIsFocussed: false,
    },
    () => {
      document.exitPointerLock()
      return null
    }
  ),
}, {age: 0, sceneIsFocussed: false})
