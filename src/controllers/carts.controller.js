import CartManager from "../dao/mongoManager/CartManager.js";
import CustomError from '../utils/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enum.js'

const cm = new CartManager()

export async function getCartByID(req,res){
    try {
        const cid = req.params.cid
        const cart = await cm.getCartById(cid)
        if(!cart){
            res.json({message: 'Cart not found'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.GET_CART_ID_ERROR, 
            message: ErrorsMessage.GET_CART_ID_ERROR, 
            cause: ErrorsCause.GET_CART_ID_ERROR
        })
    }
}

export async function addOneCart(req,res){
    try {
        const cart = await cm.addCart()
        if(!cart){
            res.json({message: 'Cart not created'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.ADD_CART_ERROR, 
            message: ErrorsMessage.ADD_CART_ERROR, 
            cause: ErrorsCause.ADD_CART_ERROR
        })
    }
}

export async function addProdToCart(req,res){
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cm.addProductToCart(cid, pid)
        if(!cart){
            res.json({message: 'Product not added to cart'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.ADD_PROD_TO_CART_ERROR, 
            message: ErrorsMessage.ADD_PROD_TO_CART_ERROR, 
            cause: ErrorsCause.ADD_PROD_TO_CART_ERROR
        })
    }
}

export async function updateCartById(req,res){
    try {
        const cid = req.params.cid
        const body = req.body
        const cart = await cm.updateCart(cid, body)
        if(!cart){
            res.json({message: 'Cart not updated'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.UPDATE_CART_ID_ERROR, 
            message: ErrorsMessage.UPDATE_CART_ID_ERROR, 
            cause: ErrorsCause.UPDATE_CART_ID_ERROR
        })
    }
}

export async function updateProductQuantity(req,res){
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        const cart = await cm.updateQuantity(cid, pid, quantity)
        if(!cart){
            res.json({message: 'Quantity not updated'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.UPDATE_PRODS_QUANTITY_ERROR, 
            message: ErrorsMessage.UPDATE_PRODS_QUANTITY_ERROR, 
            cause: ErrorsCause.UPDATE_PRODS_QUANTITY_ERROR
        })
    }
}

export async function deleteProdFromCart(req,res){
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cm.deleteProductFromCart(cid, pid)
        if(!cart){
            res.json({message: 'Product not deleted from cart'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.DEL_PROD_FROM_CART_ERROR, 
            message: ErrorsMessage.DEL_PROD_FROM_CART_ERROR, 
            cause: ErrorsCause.DEL_PROD_FROM_CART_ERROR
        })
    }
}

export async function emptyOneCart(req,res){
    try {
        const cid = req.params.cid
        const cart = await cm.emptyCart(cid)
        if(!cart){
            res.json({message: 'Cart not emptied'})
        }
        res.json(cart)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.EMPTY_CART_ERROR, 
            message: ErrorsMessage.EMPTY_CART_ERROR, 
            cause: ErrorsCause.EMPTY_CART_ERROR
        })
    }
}