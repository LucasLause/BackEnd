import jwt from "jsonwebtoken";
import config from "../config.js";
import { cookies } from "../controllers/users.controller.js";


export async function isUser(req, res, next){
    const token = await cookies[cookies.length -1]
    console.log(token)
    const verify = jwt.verify(token, config.jwt_key)
    console.log(verify)
    if(verify.user.role === "User"){
        next()
    }else{
        res.json({message: 'Not Authorized'})
    }
}


export async function isJustAdmin(req, res, next){
    const token = await cookies[cookies.length -1]
    console.log(token)
    const verify = jwt.verify(token, config.jwt_key)
    console.log(verify)
    if(verify.user.role === "Admin"){
        next()
    }else{
        res.json({message: 'Not Authorized'})
    }
}