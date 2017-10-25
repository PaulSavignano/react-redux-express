import jwt from 'jsonwebtoken'

import AccessToken from '../models/AccessToken'
import RefreshToken from '../models/RefreshToken'

const createTokens = async (user) => {
  const tokenUserObj = {
    _id: user._id.toString(),
    roles: user.roles.toString()
  }
  const refreshTokenUserObj = {
    _id: user._id.toString()
  }

  const createToken = jwt.sign({
    user: tokenUserObj
  }, process.env.JWT_SECRET, { expiresIn: '24h' })

  const createRefreshToken = jwt.sign({
    user: refreshTokenUserObj
  }, process.env.JWT_SECRET, { expiresIn: '7d' })

  const newAccessToken = new AccessToken({
    token: createToken,
    user: user._id
  })

  const newRefreshToken = new RefreshToken({
    token: createRefreshToken,
    user: user._id
  })

  await newAccessToken.save()
  await newRefreshToken.save()

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens
