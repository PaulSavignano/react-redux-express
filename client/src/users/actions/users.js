import { browserHistory } from 'react-router'
import { SubmissionError } from 'redux-form'

const error = (err) => {
  return {
    type: 'ERROR',
    err
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
        dispatch(signupUser(json))
      })
      .catch(err => dispatch(error(err.data.error)))
  }
}




export const signinUser = (user) => {
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

        localStorage.setItem('token', res.headers.get('x-auth'))
        return res.json()
      })
      .then(json => {
        dispatch(signinUser(json))
        nextPathname ? browserHistory.push(nextPathname) : browserHistory.push('/')
      })
      .catch((err) => {
        console.log(err)
        dispatch(error({ error: 'No user found, please try again'}));
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
          dispatch(authUser(json))
      })
      .catch((err) => {
        console.log('Caught', err)
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
        dispatch(error(res))
        throw new SubmissionError({ email: 'Email does not exist', _error: 'Email does not exist' })
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






export const contact = (values) => {
  return {
    type: 'CONTACT_USER',
    values
  }
}
export const startContact = (values) => {
  return function(dispatch, getState) {
    return fetch('/api/users/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(json => dispatch(contact(json)))
      .catch(err => {
        console.log(err)
        dispatch(error(err))
      })
  }
}
