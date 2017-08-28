import { ObjectID } from 'mongodb'
import jwt from 'jsonwebtoken'
import UserModel from './UserModel'

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const userThreeId = new ObjectID()

export const userSeeds = [{
  _id: userOneId,
  email: 'paul@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'maren@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}]

export const populateUsers = (done) => {
  UserModel.findOneAndDelete({})
    .then(() => {
      const userOne = new UserModel(userSeeds[0]).save()
      const userTwo = new UserModel(userSeeds[1]).save()
      return Promise.all([userOne, userTwo])
    })
    .then(() => done())
    .catch(err => done(err))
}
