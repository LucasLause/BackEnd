import { Router } from "express";
import UsersManager from "../dao/mongoManager/UserManager.js";
import {hashPassword, comparePasswords, generateToken} from '../utils/utils.js';
import passport from "passport";

const userManager = new UsersManager()

export const usersRouter = Router()


// usersRouter.post('/registro', async (req, res)=>{
//     try {
//         const {email, password} = req.body
//         const user = await userManager.getUserBy(email)
//         if(user.length!==0){
//             res.redirect('/errorRegistro')
//         }
//         const hasheo = await hashPassword(password)
//         const newUser = {...req.body, password: hasheo}
//         const add = await userManager.addUser(newUser)
//         if(add){
//             res.redirect('/login')
//         }
//     } catch (error) {
//         console.log('Error', error)
//     }
// })

// Cuenta Admin:
// adminCoder@coder.com
// adminCod3r123

usersRouter.post('/registro', passport.authenticate('registro', {failureRedirect:'/errorRegistro'}), 
    function(req, res){
    res.redirect('/login')
})

// usersRouter.post('/login', async (req, res)=>{
//     try {
//         const {email, password} = req.body
//         const user = await userManager.getUserBy(email)
//         if(user.length!==0){
//             const compare = await comparePasswords(password, user[0].password)
//             if(compare){
//                 for (const key in req.body){
//                     req.session[key] = req.body[key]
//                 }
//                 req.session.logged = true;
//                 req.session.email = user[0].email;
//                 req.session.first_name = user[0].first_name;
//                 req.session.last_name = user[0].last_name;
//                 req.session.age = user[0].age;
//                 req.session.role = user[0].role;
//                 res.redirect('/products')
//             }
//         }else{
//             res.redirect('/errorLogin')
//         }
//     } catch (error) {
//         console.log('Error', error)
//     }
// })

usersRouter.post('/login', passport.authenticate('login', {failureRedirect:'/errorLogin'}),
    function(req, res){
        req.session.logged = true;
        req.session.email = req.user.email;
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.age = req.user.age;
        req.session.role = req.user.role;
        const token = generateToken(req.user)
        res.cookie('token', token)
        if(token){
            res.redirect('/products')
        }else{
            res.json('error token')
        }
    }
)



// login github

usersRouter.get('/loginGithub',passport.authenticate('github', { scope: ['user:email']}))

usersRouter.get('/github',passport.authenticate('github', {failureRedirect:'/errorLogin'}),
function(req, res){
    req.session.logged = true;
    req.session.email = req.user.email;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    req.session.role = req.user.role;
    res.redirect('/products')
})






usersRouter.get('/logout', (req, res)=>{
    req.session.destroy((error)=>{
        if(error)console.log(error)
        else res.redirect('/login')
    })
})