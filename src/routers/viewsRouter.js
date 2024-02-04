import { Router } from "express";
import ProductManager from "../dao/mongoManager/ProductManager.js";
import socketServer from "../app.js";
import { productsModel } from "../dao/models/products.model.js";
import { cartsModel } from "../dao/models/carts.model.js";
import { isUser } from "../middlewares/auth.middleware.js";

const pm = new ProductManager()

export const viewsRouter = Router()

viewsRouter.get('/home', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
})


viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await pm.getProducts('max')
    socketServer.on('connection', (socket) => {
        socket.emit('products', products)
    })
    res.render('realTimeProducts', {products})
})


viewsRouter.post('/realtimeproducts', async (req, res) => {
    try {
        const product = req.body
        console.log('product:', product)
        await pm.init()
        await pm.addProduct(product)
        const products = await pm.getProducts('max')
        socketServer.sockets.emit('products', products)
    } catch (error) {
        res.json(error)
    }
  })


viewsRouter.get('/chat', isUser, async (req, res) =>{
    res.render('chat')
})


viewsRouter.get('/products', async (req, res) =>{
    try {
        const {limit=10, page=1, category} = req.query
        let products 
        if (!category) {
            products = await productsModel.find().limit(limit).skip(page-1).lean()
        }else{
            products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
        }
        res.render('products', {products, email:req.session.email, first_name:req.session.first_name, last_name:req.session.last_name, role:req.session.role})
    } catch (error) {
        res.json(error)
    }
})

viewsRouter.get('/admin', async (req, res) =>{
    try {
        const {limit=10, page=1, category} = req.query
        let products 
        if (!category) {
            products = await productsModel.find().limit(limit).skip(page-1).lean()
        }else{
            products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
        }
        res.render('admin', {products, email:req.session.email, first_name:req.session.first_name, last_name:req.session.last_name, role:req.session.role})
    } catch (error) {
        res.json(error)
    }
})

viewsRouter.get('/carts/:cid', async (req, res) => {
    const cid = req.params.cid
    const cart = await cartsModel.find({_id:cid}).lean()
    if (!cart) {
        res.json({message: 'cart not found'})
    } else {
        res.render('cart',{cart, cid})
    }
})

viewsRouter.get('/', (req, res)=>{
    res.redirect('/login')
})

viewsRouter.get('/login', (req, res)=>{
    res.render('login')
})

viewsRouter.get('/registro', (req, res)=>{
    res.render('registro')
})

viewsRouter.get('/errorLogin', (req, res)=>{
    res.render('errorLogin')
})

viewsRouter.get('/errorRegistro', (req, res)=>{
    res.render('errorRegistro')
})