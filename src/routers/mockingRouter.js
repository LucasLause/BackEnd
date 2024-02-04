import { Router } from 'express'
import { generateProducts } from '../utils/utils.js'

export const mockingRouter = Router()

mockingRouter.get('/', (req, res)=>{
    const products = []
    for(let i = 1; i < 101 ; i++){
        const product = generateProducts()
        products.push(product)
    }
    res.json({products}, null, 2)
})