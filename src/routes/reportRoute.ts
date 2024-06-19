import { Router } from "express";
import reportController from "../contollers/reportController";
import { auth } from "../middleware/auth";

const router = Router()

router.get('/report/:id', auth, reportController.getReport)

export default router