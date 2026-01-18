import { Router } from "express";
import controller from "../controllers/adminAttendances.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/admin/attendances",
  authMiddleware,
  controller.index
);

export default router;
