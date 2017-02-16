import mongoose from 'mongoose'

const TodoModel = mongoose.model('TodoModel', {
  uuid: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

export default TodoModel
