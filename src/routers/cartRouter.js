import { Router } from "express";
// import CartManager from "../dao/fileManager/CartManager.js";
import CartManager from "../dao/mongoManager/CartManager.js";

export const cartRouter = Router()

const cm = new CartManager()


cartRouter.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        // const cidFileSystem = parseInt(cid)
        // const cart = await cm.getCartById(cidFileSystem)
        const cart = await cm.getCartById(cid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})


cartRouter.post('/', async (req, res) => {
    try {
        const cart = await cm.addCart()
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})


cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        // const cidFileSystem = parseInt(cid)
        const pid = req.params.pid
        // const pidFileSystem = parseInt(pid)
        // const cart = await cm.addProductToCart(cidFileSystem, pid)
        const cart = await cm.addProductToCart(cid, pid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

cartRouter.put('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const body = req.body
        const cart = await cm.updateCart(cid, body)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

// updateCart: el body se pasa asi para el thunderclient o postman:
    
// {
//     "products":[
//       {
//         "product": "656d12a98324fd19ea7159b6",
//         "quantity": 1
//       }
//     ]
// }


cartRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        const cart = await cm.updateQuantity(cid, pid, quantity)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cm.deleteProductFromCart(cid, pid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

cartRouter.delete('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cm.emptyCart(cid)
        res.json(cart)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})








