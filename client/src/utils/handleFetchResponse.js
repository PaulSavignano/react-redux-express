const handleFetchResponse = ({
  dispatch,
  response
}) => {
  return response.json()
  .then(json => ({
    status: response.status,
    json
  }))
  .then(({ json, status }) => {
    console.log('handle json', json)
    console.log('status code', status)
    if (json.error) {
      if (status === 401) {
        console.log('inside 400')
        localStorage.removeItem('token')
        dispatch({ type: 'DELETE_USER' })
        dispatch({ type: 'DELETE_ALL_USERS' })
        dispatch({ type: 'DELETE_ORDERS' })
      }
      return Promise.reject(json.error)
    }
    return json
  })
}

export default handleFetchResponse
