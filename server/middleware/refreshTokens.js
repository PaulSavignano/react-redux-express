import jwt from 'jsonwebtoken'

import User from '../models/User'
import createTokens from './createTokens'
import createUserResponse from './createUserResponse'

const refreshTokens = async (token, refreshToken) => {
  let userId = -1;
  try {
    const { user: { _id } } = jwt.verify(refreshToken, process.env.JWT_SECRET);
    userId = _id;
  } catch (err) {
    console.log('refreshToken error', err)
    return Promise.reject(err)
  }

  const user = await User.findOne({ _id: userId })
  const response = await createUserResponse(user)

  const [newToken, newRefreshToken] = await createTokens(user)
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    response,
  }
}

export default refreshTokens
