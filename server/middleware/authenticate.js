import User from '../users/models/User'

const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token, roles)
      .then((user) => {
        console.log(user)
        if (!user) {
          return Promise.reject()
        }
        req.user = user
        req.token = token
        next()
      })
      .catch(err => res.status(401).send(err))
  }
}

export default authenticate
