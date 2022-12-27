import express from "express"
import { addcomment, deletecomment, getcomment } from "../controllers/comments.js";
import { verifytoken } from "../verifytoken.js";

const router =express.Router();

router.post("/",verifytoken,addcomment)
router.delete("/:id",verifytoken,deletecomment)
router.get("/:videoid",getcomment);

export default router;