import jwt from 'jsonwebtoken'

import AccessToken from '../models/AccessToken'
import RefreshToken from '../models/RefreshToken'

const createTokens = async (user) => {
  const newAccessToken = jwt.sign({
    accessToken: 123456789
  }, process.env.JWT_SECRET, { expiresIn: '24h' })

  const newRefreshToken = jwt.sign({
    refreshToken: 987654321
  }, process.env.JWT_SECRET, { expiresIn: '7d' })

  try {
    await new AccessToken({
      accessToken: newAccessToken,
      user: user._id
    }).save()

    await new RefreshToken({
      refreshToken: newRefreshToken,
      user: user._id
    }).save()

  } catch (error) {
    Promise.reject(error)
  }

  return {
    newAccessToken,
    newRefreshToken
  }
};

export default createTokens
