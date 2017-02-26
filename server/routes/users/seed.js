import { ObjectID } from 'mongodb'
import uuidV1 from 'uuid/v1'
import jwt from 'jsonwebtoken'
import UserModel from './UserModel'

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const userThreeId = new ObjectID()

export const users = [{
  _id: userOneId,
  uuid: uuidV1(),
  email: 'paul@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  uuid: uuidV1(),
  email: 'maren@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userThreeId,
  uuid: uuidV1(),
  email: 'weston@example.com',
  password: 'userThreePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userThreeId, access: 'auth'}, 'abc123').toString()
  }]
}]

export const populateUsers = (done) => {
  UserModel.remove({})
    .then(() => {
      const userOne = new UserModel(users[0]).save()
      const userTwo = new UserModel(users[1]).save()
      const userThree = new UserModel(users[2]).save()
      return Promise.all([userOne, userTwo, userThree])
    })
    .then(() => done())
    .catch(err => done(err))
}
