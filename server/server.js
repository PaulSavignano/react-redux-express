import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'

import cartsRouter from './routes/carts/cartsRouter'
import productsRouter from './routes/products/productsRouter'
import todosRouter from './routes/todos/todosRouter'
import usersRouter from './routes/users/usersRouter'
import adminsRouter from './routes/admins/adminsRouter'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/todos', todosRouter)
app.use('/api/users', usersRouter)
app.use('/api/admins', adminsRouter)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Started up at port: ${port}`)
})

export default app
