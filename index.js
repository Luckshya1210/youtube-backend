import express from "express"
const app=express();
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentsRoutes from "./routes/comments.js"
import auth from "./routes/auth.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
const connect=()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to db")
    }).catch(()=>{
        throw err;
    })
}
app.use(cookieParser())
app.use(express.json());
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentsRoutes)
app.use("/api/auth",auth)
app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message ||" Something went wrong!";
    return res.status(status).json({
        success:false,
        status:status,
        message:message
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected!");
})