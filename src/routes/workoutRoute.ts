import workoutController from "../contollers/workoutController";
import { Router } from "express";
import { auth } from "../middleware/auth";

const router = Router()

router.post('/create/workout/:id', auth, workoutController.createWorkout)
router.get('/getall/workout/:id', auth, workoutController.allWorkout)
router.delete('/delete/workout/:id', auth, workoutController.deleteWorkout)


export default router