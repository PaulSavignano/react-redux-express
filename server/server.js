import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'

import mongoose from './db/mongoose'
// Models
import { CartModel, ProductModel, TodoModel, UserModel } from './models/index'
// Routes
import { cartRoute, productsRoute, todosRoute } from './routes/index'


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/cart', cartRoute)
app.use('/api/products', productsRoute)
app.use('/api/todos', todosRoute)








const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

router.get('/cities', (req, res) => {
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598}
  ]
  res.json(cities)
})

app.use(router)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})
