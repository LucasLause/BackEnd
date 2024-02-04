import ProductManager from "../dao/mongoManager/ProductManager.js";
import { productsModel } from "../dao/models/products.model.js";
import CustomError from '../utils/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enum.js'

const pm = new ProductManager()

export async function getAllProducts(req,res){
    try {
        const {limit=10, page=1, category} = req.query //default 10 y 1
        const getProds = await pm.getProducts()
        const productsInfo = await productsModel.paginate({category}, {limit, page})
        if(!limit || !page || !category){
            res.json({
                status:'exitosoo', 
                payload: getProds, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: null})
        }else{
            if(productsInfo.hasPrevPage === false){
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: null})
            }else{
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }else{
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: null})
            }else{
                res.json({
                status:'exitoso', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }
        }
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.GET_PRODUCTS_ERROR, 
            message: ErrorsMessage.GET_PRODUCTS_ERROR, 
            cause: ErrorsCause.GET_PRODUCTS_ERROR
        })
    }
}

export async function getProductByID(req,res){
    try {
        const pid = req.params.pid
        const product = await pm.getProductById(pid)
        if(!product){
            res.json({message: 'Product not found'})
        }
        res.json({product})
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.GET_PRODUCT_ID_ERROR, 
            message: ErrorsMessage.GET_PRODUCT_ID_ERROR, 
            cause: ErrorsCause.GET_PRODUCT_ID_ERROR
        })
    }
}

export async function addOneProduct(req,res){
    try {
        const body = req.body
        const newProduct = await pm.addProduct(body)
        if(!newProduct){
            res.json({message: 'Product not added'})
        }
        console.log(newProduct)
        res.json(newProduct)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.ADD_PRODUCT_ERROR, 
            message: ErrorsMessage.ADD_PRODUCT_ERROR, 
            cause: ErrorsCause.ADD_PRODUCT_ERROR
        })
    }
}

export async function updateProductById(req,res){
    try {
        const pid = req.params.pid
        const body = req.body
        const update = await pm.updateProduct(pid, body)
        if(!update){
            res.json({message: 'Product not updated'})
        }
        const finalProduct = await pm.getProductById(pid)
        if(!finalProduct){
            res.json({message: 'Product not found'})
        }
        res.json(finalProduct)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.UPDATE_PRODUCT_ERROR, 
            message: ErrorsMessage.UPDATE_PRODUCT_ERROR, 
            cause: ErrorsCause.UPDATE_PRODUCT_ERROR
        }) 
    }
}

export async function deleteProd(req,res){
    try {
        const pid = req.params.pid
        const deleteProduct = await pm.deleteProduct(pid)
        if(!deleteProduct){
            res.json({message: 'Product not deleted'})
        }
        res.json(deleteProduct)
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.DELETE_PRODUCT_ERROR, 
            message: ErrorsMessage.DELETE_PRODUCT_ERROR, 
            cause: ErrorsCause.DELETE_PRODUCT_ERROR
        }) 
    }
}