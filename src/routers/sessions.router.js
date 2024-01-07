import { Router } from "express";
import passport from 'passport';
import '../passport/localPassport.js'


export const sessionsRouter = Router()


sessionsRouter.get('/current', passport.authenticate('current', {session: false})
,(req, res)=>{
    const reqUser = {...req.user}
    res.json({reqUser})
})
