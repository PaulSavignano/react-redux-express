import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/redux-express-mongo')

export default mongoose
