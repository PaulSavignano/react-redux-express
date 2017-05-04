import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'
import TodoModel from './TodoModel'
import { userSeeds } from '../users/seed'


export const todoSeeds = [
  { _id: new ObjectID(), text: 'First test todo', _creator: userSeeds[0]._id, completed: false  },
  { _id: new ObjectID(), text: 'Second test todo', _creator: userSeeds[1]._id, completed: true, completedAt: 333 }
]

export const populateTodos = (done) => {
  TodoModel.remove({})
    .then(() => TodoModel.insertMany(todoSeeds))
    .then(() => done())
}
