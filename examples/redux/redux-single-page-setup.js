const {createStore} = require('redux');

const initialState = {
  msg: '',
  currentPage: '',
  paused: false
};

function game (state = initialState, action) {
  switch (action.type) {
    case 'INIT':
      return {...state, currentPage: 'init', msg: action.msg};
    case 'SHOW_INTRO':
      return {...state, currentPage: 'intro', msg: action.msg};
    case 'SHOW_GAME_OPTIONS':
      return {...state, currentPage: 'game-options', msg: action.msg};
    case 'START_GAME':
      return {...state, currentPage: 'start-game', msg: action.msg};
    case 'PAUSE':
      return {...state, msg: state.currentPage + '-paused', paused: true};
    case 'RESUME':
      return {...state, msg: state.currentPage + '-resumed', paused: false};
  }
}

const store = createStore(game);

const init = () => store.dispatch({type: 'INIT', msg: 'initialize'});
const showIntro = () => store.dispatch({type: 'SHOW_INTRO', msg: 'show intro screen'});
const showGameOptions = () => store.dispatch({type: 'SHOW_GAME_OPTIONS', msg: 'show game options screen'});
const startGame = () => store.dispatch({type: 'START_GAME', msg: 'start game'});
const pause = () => store.dispatch({type: 'PAUSE'});
const resume = () => store.dispatch({type: 'RESUME'});

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));

const sequence = [
  init,
  showIntro,
  showGameOptions,
  startGame,
  pause,
  resume
];

function nextItem (index = 0) {
  setTimeout(function() {
    if (index < sequence.length) {
      sequence[index]();
      nextItem(index + 1);
    } else {
      unsubscribe();
    }
  }, 500);
}
nextItem();