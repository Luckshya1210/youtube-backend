import mongoose from "mongoose";
const VideoSchema=new mongoose.Schema({
    userid:{
        type:String,
       required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    imgurl:{
        type:String,
        required:true
    },
    videourl:{
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    
    },
    likes:{
        type:[String],
        default:[]
    
    },
    dislikes:{
        type:[String],
        default:[]
    }
},{timestamps:true})
export default mongoose.model('Video',VideoSchema)