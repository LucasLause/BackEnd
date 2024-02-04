import { Router } from "express";
import UsersManager from "../dao/mongoManager/UserManager.js";
import passport from "passport";
import { signUpUser, signUpUserPassport, loginUser, loginUserPassport, getGithub, logoutUser} from "../controllers/users.controller.js";

const userManager = new UsersManager()

export const usersRouter = Router()


// usersRouter.post('/registro', signUpUser)

// Cuenta Admin:
// adminCoder@coder.com
// adminCod3r123

usersRouter.post('/registro', passport.authenticate('registro', {failureRedirect:'/errorRegistro'}),signUpUserPassport)

// usersRouter.post('/login', loginUser)

usersRouter.post('/login', passport.authenticate('login', {failureRedirect:'/errorLogin'}), loginUserPassport)

// login github

usersRouter.get('/loginGithub', passport.authenticate('github', { scope: ['user:email']}))

usersRouter.get('/github', passport.authenticate('github', {failureRedirect:'/errorLogin'}), getGithub)

usersRouter.get('/logout', logoutUser)