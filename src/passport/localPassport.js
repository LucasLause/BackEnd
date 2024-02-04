import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { hashPassword, comparePasswords, generateToken } from "../utils/utils.js"
import { usersModel } from "../dao/models/users.model.js"
import { Strategy as GitHubStrategy } from "passport-github2"
import CartManager from "../dao/mongoManager/CartManager.js"
import {ExtractJwt ,Strategy as jwtStrategy} from "passport-jwt"

const cm = new CartManager()

//passport local
passport.use('registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},async(req, email, password, done)=>{
    const user = await usersModel.find({email})
    if(user.length!==0){
        return done(null, false)
    }
    const hasheo = await hashPassword(password)
    const newCart = await cm.addCart()
    const newUser = {...req.body, password:hasheo, cart:newCart}
    //guardado del hash
    const newUserBD = await usersModel.create(newUser)
    done(null, newUserBD)
}))


passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},async(req, email, password, done)=>{
    const user = await usersModel.findOne({email})
    if(user.length!==0){
        const compare = await comparePasswords(password, user.password)
        if(compare){
            for (const key in req.body){
                req.session[key] = req.body[key]
            }
            req.session.logged = true;
            req.session.email = user.email;
            req.session.first_name = user.first_name;
            req.session.last_name = user.last_name;
            req.session.age = user.age;
            req.session.role = user.role;
            console.log(user)
            return done(null, user)
        }
    }else{
        return done(null, false)
    }
}))




//passport github
passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.287fb3d0ecd5d7c3',
    clientSecret: '8e6dcecaf413a0dc2baeadcfaba4ad4723bc7d1a',
    callbackURL: "http://localhost:8080/api/users/github"
  }, async (accessToken, refreshToken, profile, done) => {
    const usuario = await usersModel.findOne({email:profile._json.email})
    if(!usuario){
        console.log(profile)
        const nuevoUsuario = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || ' ',
            email: profile._json.email,
            password: ' '
        }
        const resultado = await usersModel.create(nuevoUsuario)
        done(null, resultado)
    }else{
        done(null, usuario)
    }
  }
))


//passport jwt con token en cookies

export const cookieExtractor = (req)=>{
    const token = req?.cookies?.token
    return token
}

passport.use('current', new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'secretJWT'
}, async (jwtPayload, done)=>{
    console.log('----jwtpayload----', jwtPayload);
    if(jwtPayload.user){
        done(null, jwtPayload.user)
    }else{
        done(null, false)
    }
}))









//1
passport.serializeUser((user, done)=>{
    done(null, user._id)
})
//2
passport.deserializeUser(async(_id, done)=>{
    const user = await usersModel.findById(_id)
    done(null, user)
})