import express from "express"
import { deletee, dislike, getuser, like, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifytoken } from "../verifytoken.js";

const router =express.Router();

//update user
router.put('/:id',verifytoken,update)
//delete user
router.delete('/:id',verifytoken,deletee)
//get a user
router.get('/find/:id',getuser)
//subscribe a user
router.put('/sub/:id',verifytoken,subscribe)
//unsubscribe user
router.put('/unsub/:id',verifytoken,unsubscribe)
//like a video
router.put('/like/:vidid',verifytoken,like)
//dislike a video
router.put('/dislike/:vidid',verifytoken,dislike)

export default router;