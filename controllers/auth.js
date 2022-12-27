import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createErr } from "../error.js";

import  jwt  from "jsonwebtoken";
export const signup= async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser=new User({...req.body,password:hash})
        await newuser.save();
        res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }
    // res.send(req.body)
    // console.log(req.body)
};
//verify the user by access token (jwt)
export const signin= async (req,res,next)=>{
    try{
        const user=await User.findOne({name:req.body.name});
        if(!user)
        {
            return next(createErr(404,"User not found!"))
        }   
        const iscorrect= await bcrypt.compare(req.body.password,user.password);
        if(!iscorrect){
            return  next(createErr(400,"Wrong credentials!"))
        }
        const token=jwt.sign({id:user._id},process.env.JWT)
        const {password,...others}=user._doc;   //to remove the hashed password from the response of api
        res.cookie("access_token",token,{
            httpOnly:true
            //so that 3rd party cannot use our cookie
        }).status(200).json(others);
    }catch(err){
        next(err)
    }
    // res.send(req.body)
    // console.log(req.body)
};