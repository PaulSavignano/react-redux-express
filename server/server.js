import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'
import cards from './cards/routes/cards'
import carts from './products/routes/carts'
import checkout from './products/routes/checkout'
import products from './products/routes/products'
import todos from './todos/routes/todos'
import users from './users/routes/users'
import orders from './products/routes/orders'
import pages from './pages/routes/pages'
import themes from './themes/routes/themes'
import carousels from './carousels/routes/carousels'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/cards', cards)
app.use('/api/carts', carts)
app.use('/api/products', products)
app.use('/api/todos', todos)
app.use('/api/users', users)
app.use('/api/checkout', checkout)
app.use('/api/orders', orders)
app.use('/api/pages', pages)
app.use('/api/themes', themes)
app.use('/api/carousels', carousels)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Started up at port: ${port}`)
})

export default app
