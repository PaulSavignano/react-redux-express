import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'

export const authError = (error) => {
  return {
    type: 'AUTH_ERROR',
    error
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token')

  return {
    type: 'UNAUTH_USER',
    user: {
      token: null,
      roles: undefined,
      name: undefined,
      authenticated: false,
      error: undefined
    }
  }
}

export const signupUser = (user) => {
  return {
    type: 'AUTH_USER',
    user
  }
}
export const startSignupUser = ({ firstname, lastname, email, password }) => {
  console.log(firstname, lastname, email, password)
  return (dispatch, getState) => {
    return fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, lastname, email, password })
    })
      .then(res => {

        localStorage.setItem('token', res.headers.get('x-auth'))
        //browserHistory.push('/');
        return res.json()
      })
      .then(json => {
        console.log(json)
        dispatch(signupUser(json))
      })
      .catch(err => dispatch(authError(err.data.error)))
  }
}




export const signinUser = (user) => {
  console.log(user)
  return {
    type: 'AUTH_USER',
    user
  }
}
export const startSigninUser = ({ email, password }, nextPathname) => {
  return function(dispatch, getState) {
    return fetch('/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      })
      .then(json => {
        dispatch(signinUser(json))
        nextPathname ? browserHistory.push(nextPathname) : browserHistory.push('/')
      })
      .catch((err) => {
        console.log(err)
        dispatch(authError({ error: 'No user found, please try again'}));
      })
  }
}



export const authUser = (user) => {
  return {
    type: 'AUTH_USER',
    user
  }
}
export const startAuthUser = (token) => {
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


export const recovery = (message) => {
  return {
    type: 'RECOVERY',
    message
  }
}
export const startRecovery = ({ email }) => {
  return function(dispatch, getState) {
    return fetch('/api/users/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          return Promise.reject()
        }
        dispatch(recovery(user))
        //dispatch(signinUser())
        //localStorage.setItem('token', res.headers.get('x-auth'))
      })
      // .then(user => {
      //   if (user.error) {
      //     return dispatch(authError(user))
      //   }
      //   dispatch(signinUser(user))
      //
      //   browserHistory.push(nextPathname)
      // })


      //})
      .catch(res => {
        throw new SubmissionError({ email: 'Email does not exist', _error: 'Email does not exist' })
        dispatch(authError(res))
      })
  }
}


export const startFetchToken = (token) => {
  return function(dispatch, getState) {
    return fetch(`/api/users/reset/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          return Promise.reject()
        }
        dispatch({ type: 'AUTH', recovery: { token: 'valid' } })
        //localStorage.setItem('token', res.headers.get('x-auth'))
      })

      .catch(err => {
        dispatch({ type: 'AUTH_ERROR', error: 'invalid token' })
        browserHistory.push('/recovery')
      })
  }
}

export const reset = (user) => {
  return {
    type: 'AUTH_USER',
    user
  }
}
export const startReset = ({ password }, token) => {
  return function(dispatch, getState) {
    return fetch(`/api/users/reset/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
      .then(res => {
        console.log(res)
        dispatch(signinUser(res.json()))
        localStorage.setItem('token', res.headers.get('x-auth'))
        browserHistory.push('/');
        //dispatch({ type: 'RECOVER', recovered: true })
        //localStorage.setItem('token', res.headers.get('x-auth'))
      })

      .catch(err => {
        console.log(err)
        throw new SubmissionError({ email: 'Email does not exist', _error: 'Email does not exist' })
        dispatch(authError(err))
      })
  }
}
