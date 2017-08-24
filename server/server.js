import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from './db/mongoose'

import Brand from './models/Brand'

Brand.findOne({})
  .then(doc => !doc && new Brand({}).save())
  .catch(err => console.error(err))

import articleSections from './routes/articleSections'
import brands from './routes/brands'
import cards from './routes/cards'
import cardSections from './routes/cardSections'
import carts from './routes/carts'
import heroSections from './routes/heroSections'
import orders from './routes/orders'
import pages from './routes/pages'
import products from './routes/products'
import productSections from './routes/productSections'
import swipeableSections from './routes/swipeableSections'
import swipeableViews from './routes/swipeableViews'
import users from './routes/users'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/article-sections', articleSections)
app.use('/api/brands', brands)
app.use('/api/cards', cards)
app.use('/api/card-sections', cardSections)
app.use('/api/carts', carts)
app.use('/api/hero-sections', heroSections)
app.use('/api/orders', orders)
app.use('/api/pages', pages)
app.use('/api/products', products)
app.use('/api/product-sections', productSections)
app.use('/api/swipeable-sections', swipeableSections)
app.use('/api/swipeable-views', swipeableViews)
app.use('/api/users', users)

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => console.log(`Started up at port: ${port}`))

export default app
