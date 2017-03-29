import { browserHistory } from 'react-router'

export const signupUser = ({ email, password }) => {
  return (dispatch, getState) => {
    return fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        dispatch({ type: 'AUTH_USER' })
        localStorage.setItem('token', res.headers.get('x-auth'))
        browserHistory.push('/');
      })
      .catch(err => dispatch(authError(err.data.error)))
  }
}

export function signinUser({ email, password }, nextPathname) {
  return function(dispatch, getState) {
    console.log(nextPathname)
    return fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        dispatch({ type: 'AUTH_USER' });
        localStorage.setItem('token', res.headers.get('x-auth'))
        console.log(getState())
        browserHistory.push(nextPathname)
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      })
  }
}

export const authUser = (user) => {
  return {
    type: 'AUTH_USER',
    user
  }
}

export function startAuthUser(token) {
  return function(dispatch) {
    return fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        if (json.token === 'invalid') {
          dispatch(signoutUser())
        } else {
          dispatch(authUser(json))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  browserHistory.push('/signin')
  return {
    type: 'UNAUTH_USER'
  }
}

export function authError(error) {
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}
