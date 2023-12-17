import {promises as fs} from 'fs'
import ProductManager from './ProductManager.js'

const pm = new ProductManager()


class CartManager {
    static cartId = 0

    constructor(){
        this.path = '../carts.json'
        this.carts = []
    }


    async init(){
        try {
            await this.leerCarritos()
        } catch (error) {
            await this.escribirCarritos()
        }
        if(this.carts.length === 0){
            CartManager.cartId = 0
        }else{
            CartManager.cartId = this.carts.at(-1).id
        }
        
    }


    async leerCarritos(){
        const carts = await fs.readFile(this.path, 'utf-8')
        this.carts = JSON.parse(carts)
    }


    async escribirCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carts))
    }


    generarNuevoId(){
        return ++CartManager.cartId
    }


    async addCart(){
        await this.init()
        const cart = {
            id: this.generarNuevoId(),
            products: []
        }
        await this.leerCarritos()
        this.carts.push(cart)
        await this.escribirCarritos()
        return cart
    }


    async addProductToCart(id, productId){
        if(!id || !productId){
            throw new Error('Te faltan algunos datos')
        }
        const findProd = await pm.getProductById(productId)
        if(!findProd){
            throw new Error('Product not found')
        }
        const getCart = await this.getCartById(id)
        if(getCart.products.length >= 1){
            const find = getCart.products.find(p => p.product === productId)
            if(find){
                find.quantity++
                await this.leerCarritos()
                const index = this.carts.findIndex(c => c.id === id)
                if(index != -1){
                    await this.leerCarritos()
                    const update = this.carts[index] = getCart
                    await this.escribirCarritos()
                    return update
                }else{
                    throw new Error('Cart not found')
                }
            } else {
                const prods = {
                    product: productId,
                    quantity: 1
                }
                await getCart.products.push(prods)
                await this.leerCarritos()
                const index = this.carts.findIndex(c => c.id === id)
                if(index != -1){
                    await this.leerCarritos()
                    const update = this.carts[index] = getCart
                    await this.escribirCarritos()
                    return update
                }else{
                    throw new Error('Cart not found')
                }
            }
        } else{
            const prods = {
                product: productId,
                quantity: 1
            }
            await getCart.products.push(prods)
            await this.leerCarritos()
            const index = this.carts.findIndex(c => c.id === id)
            if(index != -1){
                await this.leerCarritos()
                const update = this.carts[index] = getCart
                await this.escribirCarritos()
                return update
            }else{
                throw new Error('Cart not found')
            }
        }
    }


    async getCartById(id){
        await this.leerCarritos()
        const cart = this.carts.find(p => p.id === id)
        if(cart){
            return cart
        }else{
            throw new Error('Product not found')
        }
    }

}


export default CartManager