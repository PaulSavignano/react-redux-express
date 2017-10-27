import Order from '../models/Order'
import User from '../models/User'


const createUserResponse = (user) => {
  const { _id, roles } = user

  const isOwner = roles.some(role => role === 'owner')
  const isAdmin = roles.some(role => role === 'admin')
  if (isOwner) {
    return Promise.all([
      User.findOne({ _id }).populate({ path: 'addresses' }).sort({ 'values.lastName': 1, 'values.firstName': 1 }).then(user => user),
      User.find({}).populate({ path: 'addresses' }).sort({ 'values.lastName': 1, 'values.firstName': 1 }).then(users => users),
      Order.find({}).then(orders => orders)
    ])
    .then(([user, users, orders]) => {
      return {
        user,
        users,
        orders
      }
    })
    .catch(error => Promise.reject(error))
  }
  if (isAdmin) {
    return Promise.all([
      User.findOne({ _id }).populate({ path: 'addresses' }).sort({ 'values.lastName': 1, 'values.firstName': 1 }).then(user => user),
      Order.find({}).then(orders => orders)
    ])
    .then(([user, orders]) => {
      return {
        user,
        orders
      }
    })
    .catch(error => Promise.reject(error))
  }
  return Promise.all([
    User.findOne({ _id }).populate({ path: 'addresses' }).sort({ 'values.lastName': 1, 'values.firstName': 1 }).then(user => user),
    Order.find({ user: _id }).then(orders => orders)
  ])
  .then(([user, orders]) => {
    return {
      user,
      orders
    }
  })
  .catch(error => Promise.reject(error))
}

export default createUserResponse
