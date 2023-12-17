import {promises as fs} from 'fs'

class ProductManager {
    static productId = 0

    constructor(){
        this.path = '../products.json'
        this.products = []
    }

    async init(){
        try {
            await this.leerProductos()
        } catch (error) {
            await this.escribirProductos()
        }
        if(this.products.length === 0){
            ProductManager.productId = 0
        }else{
            ProductManager.productId = this.products.at(-1).id
        }
        
    }

    async leerProductos(){
        const products = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(products)
    }

    async escribirProductos(){
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    generarNuevoId(){
        return ++ProductManager.productId
    }

    async addProduct({title, description, price, thumbnail, code, stock, status, category}){
        await this.init()
        if(!title || !description || !price || !code || !stock || !category){
            throw new Error('Te faltan algunos datos')
        }
        const codeValidation = this.products.find(c => c.code === code)
        if(codeValidation){
            throw new Error('No se puede repetir los codigos')
        }
        const product = {
            id: this.generarNuevoId(),
            title,
            description,
            code,
            price,
            status: status || true,
            stock,
            category,
            thumbnails: thumbnail || []
        }
        await this.leerProductos()
        this.products.push(product)
        await this.escribirProductos()
        return product
    }

    async getProducts(limit){
        await this.leerProductos()
        if(limit === 'max'){
            return this.products
        }else{
            return this.products.slice(0, limit)
        }
    }

    async getProductById(id){
        await this.leerProductos()
        const product = this.products.find(p => p.id === id)
        if(product){
            return product
        }else{
            throw new Error('Product not found')
        }
    }

    async updateProduct(id, {title, description, price, thumbnail, code, stock, status, category}){
        await this.leerProductos()
        const index = this.products.findIndex(p => p.id === id)
        if(index != -1){
            await this.leerProductos()
            const update = this.products[index] = {id, title, description, price, thumbnail, code, stock, status, category}
            await this.escribirProductos()
            return update
        }else{
            throw new Error('Product not found')
        }
    }

    async deleteProduct(id){
        await this.init()
        const index = this.products.findIndex(p => p.id === id)
        if(index != -1){
            await this.leerProductos()
            this.products.splice(index, 1)
            await this.escribirProductos()
            return 'Product Deleted'
        }else{
            throw new Error('Product not found')
        }
    }
}


export default ProductManager