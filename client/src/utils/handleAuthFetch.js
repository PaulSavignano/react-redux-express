const handleAuthFetch = ({ path, method, body: fetchBody }) => {
  const body = fetchBody && JSON.stringify(fetchBody)
  return fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('x-access-token'),
      'x-refresh-token': localStorage.getItem('x-refresh-token')
    },
    body
  })
  .then(response => {
    return response.json()
    .then(json => {
      if (response.ok) {
        const accessToken = response.headers.get('x-access-token')
        const refreshToken = response.headers.get('x-refresh-token')
        if (accessToken && refreshToken) {
          localStorage.setItem('x-access-token', accessToken)
          localStorage.setItem('x-refresh-token', refreshToken)
        }
        if (json.error) return Promise.reject(json.error)
        return json
      }
      return Promise.reject(json.error)
    })
  })
  .catch(error => {
    if (error.TokenExpiredError) {
      localStorage.removeItem('x-access-token')
      localStorage.removeItem('x-refresh-token')
    }
    Promise.reject(error)
  })
}

export default handleAuthFetch
