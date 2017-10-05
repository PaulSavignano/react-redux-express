const handleAuthFetch = ({ path, method, body: fetchBody }) => {
  const body = fetchBody && JSON.stringify(fetchBody)
  return fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('x-token'),
      'x-refresh-token': localStorage.getItem('x-refresh-token')
    },
    body
  })
  .then(response => {
    return response.json()
    .then(json => {
      if (response.ok) {
        const token = response.headers.get('x-token')
        const refreshToken = response.headers.get('x-refresh-token')
        if (token && refreshToken) {
          localStorage.setItem('x-token', token)
          localStorage.setItem('x-refresh-token', refreshToken)
        }
        return json
      }
      return Promise.reject(json.error)
    })
  })
  .catch(error => {
    if (error.TokenExpiredError) {
      localStorage.removeItem('x-token')
      localStorage.removeItem('x-refresh-token')
    }
    console.error(error)
    Promise.reject(error)
  })
}

export default handleAuthFetch
