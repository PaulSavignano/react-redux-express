import User from '../models/User'

const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token, roles)
    .then(user => {
      if (!user) return Promise.reject('token not found')
      req.user = user
      req.token = token
      next()
    })
    .catch(error => {
      console.error(error)
      res.status(401).send({ error })
    })
  }
}

export default authenticate
