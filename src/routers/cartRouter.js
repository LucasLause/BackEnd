import { Router } from "express";
import CartManager from "../dao/mongoManager/CartManager.js";
import { getCartByID, addOneCart, addProdToCart, updateCartById, updateProductQuantity, deleteProdFromCart, emptyOneCart} from "../controllers/carts.controller.js";
import { isUser } from "../middlewares/auth.middleware.js";

export const cartRouter = Router()

const cm = new CartManager()


cartRouter.get('/:cid', getCartByID)


cartRouter.post('/', addOneCart)


cartRouter.post('/:cid/product/:pid', isUser, addProdToCart)

cartRouter.put('/:cid', updateCartById)

// updateCart: el body se pasa asi para el thunderclient o postman:
    
// {
//     "products":[
//       {
//         "product": "656d12a98324fd19ea7159b6",
//         "quantity": 1
//       }
//     ]
// }

cartRouter.put('/:cid/product/:pid', updateProductQuantity)

cartRouter.delete('/:cid/products/:pid', deleteProdFromCart)

cartRouter.delete('/:cid', emptyOneCart)








