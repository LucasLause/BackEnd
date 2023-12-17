import { Router } from "express";
// import ProductManager from "../dao/fileManager/ProductManager.js";
import ProductManager from "../dao/mongoManager/ProductManager.js";
import { productsModel } from "../dao/models/products.model.js";

export const productsRouter = Router()

const pm = new ProductManager()


productsRouter.get('/', async (req, res) => {
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
        res.status(404).json({errorMessage: error.message})
    }
})


productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
    //  const pidFileSystem = parseInt(pid)
    //  const product = await pm.getProductById(pidFileSystem)
        const product = await pm.getProductById(pid)
        res.json({product})
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})


productsRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const newProduct = await pm.addProduct(body)
        console.log(newProduct)
        res.json(newProduct)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

// body del post:
// {
//     "title":"Prueba",
//     "description":"Prueba",
//     "code":"abc1234242423",
//     "price":5500,
//     "stock":25,
//     "status": true,
//     "category":"Prueba"
// }


productsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        // const pidFileSystem = parseInt(pid)
        const body = req.body
        // const updateProduct = await pm.updateProduct(pidFileSystem, body)
        await pm.updateProduct(pid, body)
        const finalProduct = await pm.getProductById(pid)
        res.json(finalProduct)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})  
    }
})

// body del put:
// {
//     "title":"Pruebaaa",
//     "description":"Pruebaaa",
//     "code":"abc1234242423",
//     "price":5500,
//     "stock":25,
//     "status": true,
//     "category":"Pruebaaaa"
// }

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid
        // const pidFileSystem = parseInt(pid)
        // const deleteProduct = await pm.deleteProduct(pidFileSystem)
        const deleteProduct = await pm.deleteProduct(pid)
        res.json(deleteProduct)
    } catch (error) {
        res.status(404).json({errorMessage: error.message})
    }
})

