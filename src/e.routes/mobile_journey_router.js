import { Router } from "express";
import express from "express";
import controller from "../a.controllers/mobile_journey_controller.js";



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

// ------------------------------------------------------------
// ALMOÇO
// ------------------------------------------------------------
router.post("/mobile-journeys/:journey_id/lunches", controller.add_lunch);

// ------------------------------------------------------------
// BASE LOG
// ------------------------------------------------------------
router.post("/mobile-journeys/:journey_id/base-logs", controller.add_base_log);

// ------------------------------------------------------------
// LISTAGEM
// ------------------------------------------------------------
router.get("/mobile-journeys", controller.list_journeys);
router.get("/mobile-journeys/:id", controller.get_journey_by_id);


// criar atendimento dentro da jornada
// mobile_journey_router.post(
//   "/mobile-journeys/:journey_id/attendances",
//   mobile_journey_controller.create_attendance_controller
// );


export default router;
