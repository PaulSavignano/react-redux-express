import UserModel from '../routes/users/UserModel'

export const authenticate = (req, res, next) => {
  const token = req.header('x-auth')
  UserModel.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject()
      }
      req.user = user
      req.token = token
      next()
    })
    .catch(err => res.status(401).send(err))
}
