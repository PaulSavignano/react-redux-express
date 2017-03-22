import User from '../users/models/User'

export const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token, roles).then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user
      req.token = token
      next();
    }).catch((e) => {
      res.status(401).send()
    })
  }
}
