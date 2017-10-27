import jwt from 'jsonwebtoken'

import AccessToken from '../models/AccessToken'
import RefreshToken from '../models/RefreshToken'
import createTokens from '../utils/createTokens'
import User from '../models/User'
import createUserResponse from '../utils/createUserResponse'

const authenticate = (requiredRoles) => {
  return async (req, res, next) => {
    const accessToken = req.headers['x-access-token']
    if (accessToken) {
      try {
        const { user } = await AccessToken.findOne({ accessToken }).populate('user')
        req.user = user
      } catch (error) {
        const refreshToken = req.headers['x-refresh-token']
        if (refreshToken) {
          try {
            const { user } = await RefreshToken.findOne({ refreshToken }).populate('user')
            const { newAccessToken, newRefreshToken } = await createTokens(user)
            if (newAccessToken && newRefreshToken) {
              req.user = user
              res.set('x-access-token', newAccessToken)
              res.set('x-refresh-token', newRefreshToken)
            }
          } catch (error) {
            return res.status(401).send({ error })
          }
        }
      }
    }
    next()
  }
}

export default authenticate




  //      if (user.roles.some(role => requiredRoles.indexOf(role) >= 0) {
