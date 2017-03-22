import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'
import cart from './products/routes/cart'
import checkout from './products/routes/checkout'
import products from './products/routes/products'
import todos from './todos/routes/todos'
import users from './users/routes/users'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/carts', cart)
app.use('/api/products', products)
app.use('/api/todos', todos)
app.use('/api/users', users)
app.use('/api/checkout', checkout)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Started up at port: ${port}`)
})

export default app
