import { Router } from "express";
import userController from "../contollers/userController";
import { auth } from "../middleware/auth";
import { isAdmin } from "../middleware/authorization";

const router = Router()

router.post('/signup', userController.signUp)
router.post('/login', userController.logIn)
router.get('/all/users', auth, isAdmin , userController.allUsers)
router.patch('/user/update', auth, userController.updateUser)
router.delete('/user/delete', auth, userController.deleteUser)

export default router