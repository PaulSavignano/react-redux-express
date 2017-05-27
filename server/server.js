import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'
import brands from './brands/routes/brands'
import cards from './cards/routes/cards'
import carousels from './carousels/routes/carousels'
import carts from './carts/routes/carts'
import orders from './orders/routes/orders'
import pages from './pages/routes/pages'
import products from './products/routes/products'
import sections from './sections/routes/sections'
import users from './users/routes/users'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/brands', brands)
app.use('/api/cards', cards)
app.use('/api/carousels', carousels)
app.use('/api/carts', carts)
app.use('/api/orders', orders)
app.use('/api/pages', pages)
app.use('/api/products', products)
app.use('/api/sections', sections)
app.use('/api/users', users)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Started up at port: ${port}`)
})

export default app
