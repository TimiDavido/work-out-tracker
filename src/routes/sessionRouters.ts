import { Router } from "express";
import sessionController from "../contollers/sessionController";
import { auth } from "../middleware/auth";

const router = Router()

router.post('/create/session', auth, sessionController.createSession)
router.get('/getall/session', auth, sessionController.getSession)
router.post('/update/session/:id', auth, sessionController.updateSession)
router.delete('/delete/session/:id', auth, sessionController.deleteSession)

export default router