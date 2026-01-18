// // src/e.routes/adminAttendances_router.js

// import { Router } from "express";
// import adminAttendances_controller from "../a.controllers/adminAttendances_controller";
// // import adminAttendancesController from "../a.controllers/adminAttendances_controller.js";

// const adminAttendancesRouter = Router();

// adminAttendancesRouter.get(
//   "/admin/attendances",
//   adminAttendances_controller.index
// );

// export default adminAttendancesRouter;


import { Router } from "express";
import admin_attendances_controller from "../a.controllers/admin_attendances_controller.js";

const admin_attendances_router = Router();

admin_attendances_router.post(
  "/admin-attendances",
  admin_attendances_controller.create_admin_attendance_controller
);

admin_attendances_router.get(
  "/admin-attendances",
  admin_attendances_controller.get_all_admin_attendances_controller
);

admin_attendances_router.get(
  "/admin-attendances/:attendance_id",
  admin_attendances_controller.get_admin_attendance_by_id_controller
);

admin_attendances_router.patch(
  "/admin-attendances/:attendance_id/status",
  admin_attendances_controller.change_admin_attendance_status_controller
);

export default admin_attendances_router;
