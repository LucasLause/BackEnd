import { productsModel } from "../models/products.model.js";

export default class ProductManager {

    async getProducts(){
        try {
            const products = await productsModel.find().lean()
            return products
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProduct(obj){
        try {
            const newProduct = await productsModel.create(obj)
            return newProduct 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id){
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async updateProduct(id, obj){
        try {
            const product = await productsModel.findByIdAndUpdate(id, obj)
            return product
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id){
        try {
            await productsModel.findByIdAndDelete(id)
            return 'Product Deleted'
        } catch (error) {
            throw new Error(error)
        }
    }
}