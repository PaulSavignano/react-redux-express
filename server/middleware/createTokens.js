import jwt from 'jsonwebtoken'

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

  return Promise.all([createToken, createRefreshToken]);
};

export default createTokens
