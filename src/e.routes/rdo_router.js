// import { Router } from "express";
// import cors from "cors";
// import rdo_controller, {
//   upload_photos_middleware,
// } from "../a.controllers/rdo_controller.js";

// const rdo_router = Router();

// /**
//  * =====================================================
//  * 🔥 PRE-FLIGHT (OBRIGATÓRIO PARA MULTIPART / FORMDATA)
//  * =====================================================
//  */
// rdo_router.options(
//   "/create-rdo",
//   cors({
//     origin: [
//       "https://d3n78ekyg3zlc1.cloudfront.net",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /**
//  * =====================================================
//  * 📤 CRIAR RDO (UPLOAD DE FOTOS + JSON)
//  * =====================================================
//  */
// rdo_router.post(
//   "/create-rdo",

//   // 🔑 CORS ESPECÍFICO DA ROTA
//   cors({
//     origin: [
//       "https://d3n78ekyg3zlc1.cloudfront.net",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//     methods: ["POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),

//   // 📸 Middleware de upload (multer)
//   upload_photos_middleware,

//   // 🎯 Controller final
//   rdo_controller.create_rdo_controller
// );

// /**
//  * =====================================================
//  * ❌ MARCAR RDO COMO NÃO EXECUTADO
//  * =====================================================
//  */
// rdo_router.put(
//   "/not-executed/:bill_id",
//   cors({
//     origin: [
//       "https://d3n78ekyg3zlc1.cloudfront.net",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   }),
//   rdo_controller.rdo_not_executed
// );

// /**
//  * =====================================================
//  * 📄 GERAR PDF DO RDO
//  * =====================================================
//  */
// rdo_router.get(
//   "/rdo-by-bill/:bill_id/pdf",
//   cors({
//     origin: [
//       "https://d3n78ekyg3zlc1.cloudfront.net",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   }),
//   rdo_controller.generate_rdo_pdf_controller
// );

// /**
//  * =====================================================
//  * 📋 LISTAR RDOS POR PROJETO
//  * =====================================================
//  */
// rdo_router.get(
//   "/rdo-by-project/:project_id",
//   cors({
//     origin: [
//       "https://d3n78ekyg3zlc1.cloudfront.net",
//       "http://localhost:5173",
//     ],
//     credentials: true,
//   }),
//   rdo_controller.get_rdo_by_project_controller
// );

// export default rdo_router;



import { Router } from "express";
import rdo_controller, {
  upload_photos_middleware
} from "../a.controllers/rdo_controller.js";

const rdo_router = Router();

rdo_router.post(
  "/create-rdo",
  upload_photos_middleware,
  rdo_controller.create_rdo_controller
);

rdo_router.get(
  "/rdo-by-bill/:bill_id/pdf",
  rdo_controller.generate_rdo_pdf_controller
);

rdo_router.put(
  "/not-executed/:bill_id",
  rdo_controller.rdo_not_executed
);

rdo_router.get(
  "/rdo-by-project/:project_id",
  rdo_controller.get_rdo_by_project_controller
);

export default rdo_router;
