import { type } from '../actions/carousels'

const carousels = (state = {
  adminAppOpen: false,
  appOpen: false,
  autoplay: true,
  editCarousel: null,
  editSlide: null,
  isFetching: true,
  items: [],
}, action) => {
  switch (action.type) {
    case `START_EDIT_${type}`:
      return {
        ...state,
        autoplay: false,
        editCarousel: action.editCarousel
      }
    case `STOP_EDIT_${type}`:
      return {
        ...state,
        autoplay: true,
        editCarousel: null
      }
    case `START_EDIT_CHILD_${type}`:
      return {
        ...state,
        autoplay: false,
        editSlide: action.editSlide
      }
    case `STOP_EDIT_CHILD_${type}`:
      return {
        ...state,
        autoplay: true,
        editSlide: null
      }
    case `REQUEST_${type}S`:
      return {
        ...state,
        isFetching: true
      }
    case `RECEIVE_${type}S`:
      return {
        ...state,
        isFetching: false,
        items: action.items,
      }
    case `ADD_${type}`:
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.carousel }
        ],
        editSlide: action.editSlide
      }
    case `UPDATE_${type}`:
      return {
        ...state,
        autoplay: true,
        editCarousel: null,
        editSlideId: null,
        items: state.items.map(item => item._id === action.item._id ?
          { ...item, ...action.item } :
          item
        )
      }
    case `DELETE_${type}`:
      return {
        ...state,
        autoplay: true,
        editCarousel: null,
        editSlideId: null,
        items: state.items.filter(item => item._id !== action._id)
      }
    case `DELETE_${type}S`:
      return {
        ...state,
        autoplay: true,
        editCarousel: null,
        editSlideId: null,
        items: state.items.filter(item => action.items.indexOf(item._id) === -1),
      }
    case `ERROR_${type}`:
      return {
        ...state,
        error: action.error
      }
    case `TOGGLE_APP_${type}`:
      return {
        ...state,
        appOpen: action.appOpen
      }
    case `TOGGLE_ADMIN_APP_${type}`:
      return {
        ...state,
        adminAppOpen: action.adminAppOpen
      }
    default:
      return state
  }
}

export default carousels
