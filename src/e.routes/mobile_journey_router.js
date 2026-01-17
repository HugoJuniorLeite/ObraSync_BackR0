import { Router } from "express";
import express from "express";
import controller from "../a.controllers/mobile_journey_controller.js";
import { authMiddleware } from "../d.middlewares/auth_middleware.js";



const router = Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ------------------------------------------------------------
// INÍCIO + FIM
// ------------------------------------------------------------
router.post("/mobile-journeys/start", controller.start_journey);
router.patch("/mobile-journeys/:id/finish", controller.finish_journey);

// ------------------------------------------------------------
// INICIAR ATENDIMENTO (Step 5)
// ------------------------------------------------------------
router.patch(
  "/mobile-attendances/:attendance_id/start-service",
  controller.start_service
);


// ------------------------------------------------------------
// ATENDIMENTOS
// ------------------------------------------------------------
router.post(
  "/mobile-journeys/:journey_id/attendances",
  controller.add_attendance
);

router.post(
  "/mobile-attendances/:attendance_id/route-point",
  controller.add_route_point
);


router.patch(
  "/mobile-attendances/:attendance_id/finish",
  controller.finish_service
);

router.put(
  "/mobile-attendances/:attendance_id/os",
  authMiddleware,
  controller.update_attendance_os
);


// ------------------------------------------------------------
// INICIAR ALMOÇO
// ------------------------------------------------------------
router.post("/mobile-journeys/:journey_id/lunches", controller.add_lunch);

// ------------------------------------------------------------
// FINALIZAR ALMOÇO
// ------------------------------------------------------------
router.patch(
  "/mobile-lunches/:lunch_id/finish",
  controller.finish_lunch
);


// ------------------------------------------------------------
// SUSPENDER ALMOÇO
// ------------------------------------------------------------
router.patch(
  "/mobile-lunches/:lunch_id/suspend",
  controller.suspend_lunch
);


// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
router.post("/mobile-journeys/:journey_id/base-logs", controller.add_base_log);

// ------------------------------------------------------------
// LISTAGEM
// ------------------------------------------------------------
router.get("/mobile-journeys",   authMiddleware,      // 🔒 obrigatório
 controller.list_journeys);
router.get("/mobile-journeys/:id", controller.get_journey_by_id);


// criar atendimento dentro da jornada
// mobile_journey_router.post(
//   "/mobile-journeys/:journey_id/attendances",
//   mobile_journey_controller.create_attendance_controller
// );

router.get(
  "/mobile-journeys/active",
  authMiddleware,
  controller.get_active_journey_full
);


export default router;
