import express from 'express'
import { engine } from 'express-handlebars'
import { productsRouter } from './routers/productsRouter.js'
import { cartRouter } from './routers/cartRouter.js'
import { usersRouter } from './routers/usersRouter.js'
import { viewsRouter } from './routers/viewsRouter.js'
import { sessionsRouter } from './routers/sessions.router.js'
import { Server } from 'socket.io'
import { messagesModel } from './dao/models/messages.model.js'
import './dbConfig.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import './passport/localPassport.js'

const app = express()

app.use(cookieParser())
app.use(session({
    store: new MongoStore({
        mongoUrl: 'mongodb+srv://lucaslause:smukoyluke@cluster0.3gnogvw.mongodb.net/ecommerce?retryWrites=true&w=majority'
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
app.use('api/sessions', sessionsRouter)



const httpServer = app.listen(8080, () => {
    console.log('conectado al puerto 8080')
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