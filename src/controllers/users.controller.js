import UsersManager from "../dao/mongoManager/UserManager.js";
import { generateToken, hashPassword } from '../utils/utils.js';
import CustomError from '../utils/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../utils/errors/errors.enum.js'

const userManager = new UsersManager()


export async function signUpUser(req, res){
    try {
        const {email, password} = req.body
        const user = await userManager.getUserBy(email)
        if(user.length!==0){
            res.redirect('/errorRegistro')
        }
        const hasheo = await hashPassword(password)
        const newUser = {...req.body, password: hasheo}
        const add = await userManager.addUser(newUser)
        if(add){
            res.redirect('/login')
        }else{
            res.json({message: 'User not added'})
        }
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.SIGNUP_USER_ERROR,
            message: ErrorsMessage.SIGNUP_USER_ERROR,
            cause: ErrorsCause.SIGNUP_USER_ERROR
        })
    }
}

export async function signUpUserPassport(req, res){
    try {
        res.redirect('/login')
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.SIGNUP_USER_PASSPORT_ERROR,
            message: ErrorsMessage.SIGNUP_USER_PASSPORT_ERROR,
            cause: ErrorsCause.SIGNUP_USER_PASSPORT_ERROR
        })
    }
}

export const cookies = []

export async function loginUser(req, res){
    try {
        const {email, password} = req.body
        const user = await userManager.getUserBy(email)
        if(user.length!==0){
            const compare = await comparePasswords(password, user[0].password)
            if(compare){
                for (const key in req.body){
                    req.session[key] = req.body[key]
                }
                req.session.logged = true;
                req.session.email = user[0].email;
                req.session.first_name = user[0].first_name;
                req.session.last_name = user[0].last_name;
                req.session.age = user[0].age;
                req.session.role = user[0].role;
                const token = generateToken(req.user)
                res.cookie('token', token)
                if(token){
                    cookies.push(token)
                    if(user[0].role === "Admin"){
                        res.redirect('/admin')
                    }else{
                        res.redirect('/products')
                    }
                }else{
                    res.json('error token')
                }
            }
        }else{
            res.redirect('/errorLogin')
        }
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.LOGIN_USER_ERROR,
            message: ErrorsMessage.LOGIN_USER_ERROR,
            cause: ErrorsCause.LOGIN_USER_ERROR
        })
    }
}

export async function loginUserPassport(req, res){
    try {
        req.session.logged = true;
        req.session.email = req.user.email;
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.age = req.user.age;
        req.session.role = req.user.role;
        const token = generateToken(req.user)
        res.cookie('token', token)
        if(token){
            cookies.push(token)
            if(req.user.role === "Admin"){
                res.redirect('/admin')
            }else{
                res.redirect('/products')
            }
        }else{
            res.json('error token')
        }
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.LOGIN_USER_PASSPORT_ERROR,
            message: ErrorsMessage.LOGIN_USER_PASSPORT_ERROR,
            cause: ErrorsCause.LOGIN_USER_PASSPORT_ERROR
        })
    }
    
}

export async function getGithub(req, res){
    try {
        req.session.logged = true;
        req.session.email = req.user.email;
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.age = req.user.age;
        req.session.role = req.user.role;
        res.redirect('/products')
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.GET_GITHUB_ERROR,
            message: ErrorsMessage.GET_GITHUB_ERROR,
            cause: ErrorsCause.GET_GITHUB_ERROR
        })
    }
    
}

export async function logoutUser(req, res){
    try {
        req.session.destroy((error)=>{
            if(error)console.log(error)
            else res.redirect('/login')
        })
    } catch (error) {
        CustomError.createCustomError({
            name: ErrorsName.LOGOUT_USER_ERROR,
            message: ErrorsMessage.LOGOUT_USER_ERROR,
            cause: ErrorsCause.LOGOUT_USER_ERROR
        })
    }
    
}