import commentController from "../contollers/commentController";
import { Router } from "express";
import { auth } from "../middleware/auth";

const router = Router()

router.post('/create/comment/:id', auth, commentController.createComment)
router.delete('/delete/comment/:id', auth, commentController.deleteComment)
router.patch('/update/comment/:id', auth, commentController.updateComment)

export default router