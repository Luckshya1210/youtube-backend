import jwt from "jsonwebtoken"
import { createErr } from "./error.js"
export const verifytoken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token){
        return next(createErr(401,'You are not authenticated!'))

    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            return next(createErr(403,'Token not valid!'))
        }
        req.user=user
        next()
    })
}