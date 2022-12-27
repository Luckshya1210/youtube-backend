import { createErr } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const update=async(req,res,next)=>{
    console.log(req);
   if(req.params.id===req.user.id){
        try{
            const updateduser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            {new:true}
            )
            res.status(200).json(updateduser)
        }catch{
            
        }

   }else{
       return next(createErr(403,"You can update only your account!"))    
   }
};
export const deletee=async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try{
            // console.log(req);
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted")
        }catch{
            
        }

   }else{
       return next(createErr(403,"You can delete only your account!"))    
   }
};
export const getuser=async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user)
    }catch(err){
        next(err);
    }
};
export const subscribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id,{
            $push:{subscribedUsers:req.user.id},
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1},
        });
        res.status(200).json("Subscription successfull!")
    }catch(err){
        next(err)
    }
};
export const unsubscribe=async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).json("Unsubscription successfull!")
    }catch(err){
        next(err)
    }
};
export const like=async(req,res,next)=>{
    const id=req.user.id;
    const videoid=req.params.vidid;
    
    try{
        await Video.findByIdAndUpdate(videoid,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("Video liked!")
    }catch(err){
        next(err);
    }
};
export const dislike=async(req,res,next)=>{
    const id=req.user.id;
    const videoid=req.params.vidid;
    try{
        await Video.findByIdAndUpdate(videoid,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("Feedback shared with creator")
    }catch(err){
        next(err);
    }
};