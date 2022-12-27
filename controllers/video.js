import { createErr } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js"
export const addvideo=async(req,res,next)=>{
    const nvideo=new Video({userid:req.user.id,...req.body})
    try{
        const savedvid=await nvideo.save();
        res.status(200).json(savedvid);
    }catch(err){
        next(err); 
    }
};
export const updatevideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video){
            return next(createErr(404,"Video not found"))
        }
        if(req.user.id===video.userId){
            const updatevid=await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            );
            res.status(200).json(updatevid);
        }else{
            return next(createErr(403,"You can update only your video"))
        }
    }catch(err){
        next(err);
    }
};
export const deletevideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video){
            return next(createErr(404,"Video not found"))
        }
        if(req.user.id===video.userId){
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json("Video has been deleted");
        }else{
            return next(createErr(403,"You can delete onlly your video"))
        }
    }catch(err){
        next(err);
    }
};
export const getvideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        res.status(200).json(video)
    }catch(err){
        next(err);
    }
};
export const addview=async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        });
        res.status(200).json("The view incremented")
    }catch(err){
        next(err);
    }
};
export const random=async(req,res,next)=>{
    try{
        const videos=await Video.aggregate([{$sample:{size:11}}]);
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
};
export const trend=async(req,res,next)=>{
    try{
        const videos=await Video.find().sort({views:-1});
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
};
export const sub=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        const subchannels=user.subscribedUsers;
        const list=await Promise.all(
            subchannels.map(async(channelid)=>{
                return await Video.find({userid:channelid})
            })
        );
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    }catch(err){
        next(err);
    }
};
export const getbytag=async(req,res,next)=>{
    const tags=req.query.tags.split(",");
    // console.log(tags);s
    try{
        const videos=await Video.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
};
export const search=async(req,res,next)=>{
    const query=req.query.q
    try{
        const videos=await Video.find({title:{$regex:query,$options:"i"}}).limit(40);
        res.status(200).json(videos)
    }catch(err){
        next(err);
    }
};