import mongoose from "mongoose";
const CommentSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    videoid:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
},{timestamps:true})
export default mongoose.model('Comment',CommentSchema)