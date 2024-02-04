import { Router } from "express";
import ProductManager from "../dao/mongoManager/ProductManager.js";
import { addOneProduct, deleteProd, getAllProducts, getProductByID, updateProductById } from "../controllers/products.controller.js";
import {isJustAdmin} from '../middlewares/auth.middleware.js';

export const productsRouter = Router()

const pm = new ProductManager()


productsRouter.get('/', getAllProducts)

productsRouter.get('/:pid', getProductByID)

productsRouter.post('/', isJustAdmin, addOneProduct)

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


productsRouter.put('/:pid', isJustAdmin, updateProductById)

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

productsRouter.delete('/:pid', isJustAdmin, deleteProd)

