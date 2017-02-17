import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'

import cartsRouter from './routes/carts/cartsRouter'
import productsRouter from './routes/products/productsRouter'
import todosRouter from './routes/todos/todosRouter'
// import usersRouter from './routes/users/usersRouter'

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/todos', todosRouter)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.listen(port, () => {
  console.log(`Started up at port: ${port}`)
})

export default app
