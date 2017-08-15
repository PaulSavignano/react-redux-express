import mongoose from 'mongoose'
import '../config/config'

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
})

export default mongoose
