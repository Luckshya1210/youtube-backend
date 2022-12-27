import { createErr } from "../error.js";
import Comments from "../models/Comments.js";
import Video from "../models/Video.js";

export const addcomment=async(req,res,next)=>{
    const newcomment=new Comments({...req.body,userid:req.user.id})
    try{
        const savedcom=await newcomment.save();
        res.status(200).send(savedcom)
    }catch(err){
        next(err);
    }
};
export const deletecomment=async(req,res,next)=>{
    try{
        const comment=await Comments.findById(req.params.id);
        const vid=await Video.findById(req.params.id);
        if(req.user.id===comment.userid || req.user.id===vid.userid){
            //delete if commented by a user or owner of a vid can also delete
            await Comments.findByIdAndDelete(req.params.id);
            res.status(200).json("The comment has been deleted.")

        }else{
            return next(createErr(403,"You can delete only your comment."));
        }
    }catch(err){
        next(err);
    }
};
export const getcomment=async(req,res,next)=>{
    try{
        const comments=await Comments.find({videoid:req.params.videoid});
        res.status(200).json(comments);
    }catch(err){
        next(err);
    }
};