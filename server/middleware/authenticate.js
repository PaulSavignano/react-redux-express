import UserModel from '../routes/users/UserModel'

export const authenticate = (roles) => {
  return (req, res, next) => {
    const token = req.header('x-auth')
    UserModel.findByToken(token, roles).then((user) => {
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
