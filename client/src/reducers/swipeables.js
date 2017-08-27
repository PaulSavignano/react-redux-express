import { type } from '../actions/swipeables'

const swipeables = (state = {
  autoplay: true
}, action) => {
  switch (action.type) {
    case `START_PLAY_${type}`:
      return {
        ...state,
        autoplay: true
      }
    case `STOP_PLAY_${type}`:
      return {
        ...state,
        autoplay: false
      }
    default:
      return state
  }
}

export default swipeables
