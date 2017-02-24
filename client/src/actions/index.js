export const fetchLocation = () => {
  return (dispatch, getState) => {
    dispatch(startLocationFetch())
  }
}
