import { cartsModel } from "../models/carts.model.js";
import ProductManager from "./ProductManager.js";

const pm = new ProductManager()

export default class CartManager{

    async getCartById(id){
        try {
            const cart = await cartsModel.find({_id: id})
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCart(obj){
        try {
            const cart = await cartsModel.create(obj)
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(cartId, prodId){
        try {
            if(!cartId || !prodId){
                throw new Error('Te faltan algunos datos')
            }
            const findProd = await pm.getProductById(prodId)
            if(!findProd){
                throw new Error('Product not found')
            }
            const getCart = await cartsModel.findById(cartId)
            if(getCart.products.length >= 1){
                const find = getCart.products.find((p) => p.product.toString() === prodId)
                if(find){
                    throw new Error('Product already in cart') 
                }else{
                    const prod = {
                        product: prodId,
                        quantity: 1
                    }
                    getCart.products = [...getCart.products, prod]
                    await getCart.save()
                    const updateCart = await cartsModel.findOneAndUpdate({cartId, getCart})
                    return updateCart
                }
            }else{
                const prod = {
                    product: prodId,
                    quantity: 1
                }
                getCart.products = [...getCart.products, prod]
                await getCart.save()
                const updateCart = await cartsModel.findOneAndUpdate({cartId, getCart})
                return updateCart
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    async updateCart(cartId, obj){
        try {
            await cartsModel.findByIdAndUpdate(cartId, obj)
            const cart = await cartsModel.findById(cartId)
            return cart
        } catch (error) {
            throw new Error(error) 
        }
    }


    async updateQuantity(cartId, prodId, quantity){
        try {
            const cart = await cartsModel.findById(cartId)
            if(!cart){
                return 'cart not found'
            }
            const product = cart.products.find((p) => p.product.toString() === prodId)
            product.quantity = quantity
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error) 
        }
    }


    async deleteProductFromCart(cartId, prodId){
        try {
            const cart = await cartsModel.findById(cartId)
            cart.products = cart.products.filter((p) => p.product != prodId)
            cart.products = [...cart.products]
            return cart
        } catch (error) {
            throw new Error(error) 
        }
    }


    async emptyCart(cartId){
        try {
            const cart = await cartsModel.findById(cartId)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error) 
        }
    }


}