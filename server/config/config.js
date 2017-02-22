const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  process.env.PORT = 3001
  process.env.MONGODB_URI = 'mongodb://localhost:27017/redux-express-mongo'
} else if (env === 'test') {
  process.env.PORT = 3001
  process.env.MONGODB_URI = 'mongodb://localhost:27017/redux-express-mongo-test'
}
