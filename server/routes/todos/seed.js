import { ObjectID } from 'mongodb'
import TodoModel from './TodoModel'

export const todos = [
  { _id: new ObjectID(), text: 'First test todo', completed: false  },
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 },
  { _id: new ObjectID(), text: 'Third test todo', completed: true, completedAt: 999  }
]

export const populateTodos = (done) => {
  TodoModel.remove({})
    .then(() => TodoModel.insertMany(todos))
    .then(() => done())
}
