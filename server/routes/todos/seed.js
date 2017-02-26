import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'
import TodoModel from './TodoModel'

export const todos = [
  { _id: new ObjectID(), uuid: uuidV1(), text: 'First test todo', completed: false  },
  { _id: new ObjectID(), uuid: uuidV1(), text: 'Second test todo', completed: true, completedAt: 333 },
  { _id: new ObjectID(), uuid: uuidV1(), text: 'Third test todo', completed: true, completedAt: 999  }
]

export const populateTodos = (done) => {
  TodoModel.remove({})
    .then(() => TodoModel.insertMany(todos))
    .then(() => done())
}
