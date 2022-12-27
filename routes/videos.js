import express from "express"
import { addvideo, addview, deletevideo, getbytag, getvideo, random, search, sub, trend, updatevideo } from "../controllers/video.js";
import { verifytoken } from "../verifytoken.js";

const router =express.Router();

//create vids
router.post("/",verifytoken,addvideo)
router.put("/:id",verifytoken,updatevideo)
router.delete("/:id",verifytoken,deletevideo)
router.get("/find/:id",getvideo)
router.get("/view/:id",addview)
router.get("/trend",trend)
router.get("/random",random)
router.get("/sub",verifytoken,sub)
router.get("/tags",getbytag)
router.get("/search",search)

export default router;