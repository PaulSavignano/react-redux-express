import { startPlay, stopPlay } from './swipeables'

export const type = 'EDIT_ITEM'

const START_EDIT = `START_EDIT_${type}`
const STOP_EDIT = `STOP_EDIT_${type}`

export const startEdit = ({ item, kind }) => {
  return (dispatch, getState) => {
    dispatch({ type: START_EDIT, kind, item })
    dispatch(stopPlay())
  }
}

export const stopEdit = () => {
  return (dispatch, getState) => {
    dispatch({ type: STOP_EDIT })
    dispatch(startPlay())
  }
}
