import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import mongoose from './db/mongoose'

import cartsRouter from './routes/carts/cartsRouter'
import productsRouter from './routes/products/productsRouter'
import todosRouter from './routes/todos/todosRouter'
// import usersRouter from './routes/users/usersRouter'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)
app.use('/api/todos', todosRouter)


const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})

export default app
