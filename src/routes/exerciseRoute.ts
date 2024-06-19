import { Router } from "express";
import { auth } from "../middleware/auth";
import excerciseController from "../contollers/exerciseController";

const router = Router()

router.post('/create/exercise', auth, excerciseController.createExercise)
router.delete('/delete/exercise/:id', auth, excerciseController.deleteExercise)
router.patch('/update/exercise/:id', auth, excerciseController.updateExercise)
router.get('/getAll/exercise', auth, excerciseController.getAllExercise)

export default router