// src/e.routes/adminAttendances_router.js

import { Router } from "express";
import adminAttendancesController from "../a.controllers/adminAttendances_controller.js";

const adminAttendancesRouter = Router();

adminAttendancesRouter.get(
  "/admin/attendances",
  adminAttendancesController.index
);

export default adminAttendancesRouter;
