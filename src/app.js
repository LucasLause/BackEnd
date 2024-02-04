import express from 'express'
import { engine } from 'express-handlebars'
import { productsRouter } from './routers/productsRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import { usersRouter } from './routers/usersRouter.js'
import { viewsRouter } from './routers/viewsRouter.js'
import { sessionsRouter } from './routers/sessions.router.js'
import { purchasesRouter } from './routers/purchasesRouter.js'
import { mockingRouter } from './routers/mockingRouter.js'
import { Server } from 'socket.io'
import { messagesModel } from './dao/models/messages.model.js'
import './dbConfig.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import './passport/localPassport.js'
import config from './config.js'
import { errorMiddleware } from './utils/errors/errors.middleware.js'

const app = express()

app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongo_uri
      }),
    secret:'secretKey',
    resave:true,
    saveUninitialized:true
}))


app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

// passport
app.use(passport.initialize())
app.use(passport.session())

//rutas
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', usersRouter)
app.use('/api/purchases', purchasesRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/mockingproducts', mockingRouter)

app.use(errorMiddleware)

const httpServer = app.listen(config.puerto, () => {
    console.log(`Conectado a puerto ${config.puerto}`)
})


const socketServer = new Server(httpServer)
const mensajes = []

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })


    //chat

    socket.on('mensaje', info => {
        mensajes.push(info)
        socketServer.emit('chat', mensajes)
        async function addMessage() {
            try {
                const newMessage = await messagesModel.create(info)
                console.log(newMessage)
                return newMessage
            } catch (error) {
                console.log(error)
            }
        }
        addMessage()
        console.log(info)
    })


})

export default socketServer