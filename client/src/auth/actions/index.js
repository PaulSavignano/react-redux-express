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
        const token = { res}
        localStorage.setItem('token', res.headers.get('x-auth'))
        browserHistory.push('/');
      })
      .catch(err => dispatch(authError(err.data.error)))
  }
}

export function signinUser({ email, password }) {
  return function(dispatch) {
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
        browserHistory.push('/')
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      })
  }
}

export function authUser(token) {
  return function(dispatch) {
    return fetch('/api/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token
      }
    })
      .then(res => {
        console.log(res)
        if (res.statusText === 'Unauthorized') {
          console.log('NOT AUTHORIZED')
          dispatch(signoutUser())
          browserHistory.push('/signin')
        } else {
          dispatch({ type: 'AUTH_USER' })
        }
      })
      .catch((err) => {
        console.log('Catching error time to remove localstorage')
        dispatch(authError('Bad login info'))
        browserHistory.push('/signin')
      })
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
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
