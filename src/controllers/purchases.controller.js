import config from "../config.js"
import TicketDTO from '../dto/ticket.dto.js'
import CartManager from "../dao/mongoManager/CartManager.js"
import ProductManager from "../dao/mongoManager/ProductManager.js"
import { cookies } from "./users.controller.js"
import {ticketModel} from '../dao/models/ticket.model.js'
import { transporter } from '../messages/nodemailer.js'
import jwt from 'jsonwebtoken'
import CustomError from '../utils/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enum.js'

const cm = new CartManager()
const pm = new ProductManager()

export async function purchaseCart(req, res){
    try {
        const cid = req.params.cid
        const cart = await cm.getCartById(cid)
        if(!cart){
            res.json({message: 'Cart not found'})
        }
        const prods = cart[0].products.map((p)=>p)
        let responseSent = false
        if(prods.length === 0){
            res.json({message: 'The cart is empty'})
        }else{
            const total = []
            const stock = []
            const noStock = []            
            for (const p of prods){
                const product = await pm.getProductById(p.product)
                if (!product) {
                    res.json({ message: `Product with id ${p.product} not found`})
                    responseSent = true
                    break
                }
                if(product.stock !==0 && p.quantity > product.stock){
                    await res.json({message: `There is not enough stock for ${product.title}, the stock is: ${product.stock}. Please lower the stock if you wish to purchase`})
                    responseSent = true
                    break
                }
                if(product.stock !== 0){
                    const newStock = product.stock - p.quantity
                    await pm.updateProduct(product._id, {stock: newStock},{new:true})
                    stock.push(p)
                    const price = product.price * p.quantity
                    total.push(price)
                }
                if(product.stock === 0){
                    noStock.push(p)
                }
            }
            if(!responseSent){
                let sum = 0
                for (let key in total) {
                    sum += total[key]
                }
                const token = cookies[cookies.length - 1]
                let verify
                if(token){
                    verify = jwt.verify(token, config.jwt_key)
                }
                let email
                if(verify){
                    email = verify.user.email
                }
                const ticket = await ticketModel.create({amount: sum, purchaser: email})
                if(!ticket){
                    res.json({ message: "Could not create ticket" })
                }
                await cm.emptyCart(cid)
                await cm.getCartById(cid)

                await cm.updateCart(cid, {products: noStock}, {new: true})
                const cart = await cm.getCartById(cid)
                console.log('in cart:', cart)

                const emailTicket = TicketDTO.getTicketFrom(ticket)

                const messageOptions = {
                    from:'Lause E-Commerce',
                    to: email,
                    subject: 'Successfull Purchase!',
                    html: `
                    <h2>Hello ${verify.user.first_name} ${verify.user.last_name},</h2>
                    <h3>Your purchase was successfull! Here's your ticket:</h3>
                    <div>
                        <ul>
                            <li>Code: ${emailTicket.code}</li>
                            <li>Purchase Date and Time: ${emailTicket.purchase_datetime}</li>
                            <li>Total Amount: ${emailTicket.amount}</li>
                        </ul>
                    </div>
                    `
                }
                if(!messageOptions){
                    res.json({message: 'Email not sent'})
                }
                const send = transporter.sendMail(messageOptions)
                if(!send){
                    res.json({message: 'Email not sent'})
                }
                res.json({ message: "Purchase successful. Here's your Ticket:", ticket})
            }
        }
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.PURCHASE_CART_ERROR,
            message: ErrorsMessage.PURCHASE_CART_ERROR,
            cause: ErrorsCause.PURCHASE_CART_ERROR
        })
    }
}