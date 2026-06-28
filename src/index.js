// import dotenv from "dotenv";
// dotenv.config({ path: "../.env" });

// import express from "express";
// import cors from "cors";
// import router from "./e.routes/index.js";

// console.log("SUPABASE_URL =>", process.env.SUPABASE_URL);

// const app = express();

// /**
//  * =====================================================
//  * 🌍 ORIGENS PERMITIDAS
//  * =====================================================
//  */
// const allowedOrigins = [
//   "https://d3n78ekyg3zlc1.cloudfront.net",
//   "http://localhost:5173",
// ];

// /**
//  * =====================================================
//  * 🔐 CORS (COMPATÍVEL COM EXPRESS 5)
//  * =====================================================
//  */
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// /**
//  * =====================================================
//  * 📦 BODY PARSER
//  * =====================================================
//  */
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// /**
//  * =====================================================
//  * 🚦 HEALTH CHECK
//  * =====================================================
//  */
// app.get("/health", (_, res) => {
//   res.status(200).json({ status: "ok" });
// });

// /**
//  * =====================================================
//  * 🚏 ROTAS
//  * =====================================================
//  */
// app.use(router);

// /**
//  * =====================================================
//  * 🚀 START SERVER
//  * =====================================================
//  */
// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`🚀 Backend rodando na porta ${PORT}`);
// });


import dotenv from "dotenv";

// =====================================================
// 📄 CARREGA O .ENV
// =====================================================
dotenv.config();

// =====================================================
// 📦 IMPORTS
// =====================================================
import express from "express";
import cors from "cors";
import router from "./e.routes/index.js";

// =====================================================
// 🔍 LOG DAS VARIÁVEIS IMPORTANTES
// =====================================================
console.log("======================================");
console.log("🚀 Inicializando Backend...");
console.log("NODE_ENV.............:", process.env.NODE_ENV || "development");
console.log("PORT.................:", process.env.PORT);
console.log("AWS_REGION...........:", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME......:", process.env.AWS_BUCKET_NAME);
console.log(
  "AWS_ACCESS_KEY_ID....:",
  process.env.AWS_ACCESS_KEY_ID
    ? process.env.AWS_ACCESS_KEY_ID.substring(0, 6) + "********"
    : "NÃO DEFINIDA"
);
console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY
    ? "******** CARREGADA ********"
    : "NÃO DEFINIDA"
);
console.log(
  "SUPABASE_URL.........:",
  process.env.SUPABASE_URL || "NÃO DEFINIDA"
);
console.log("======================================");

// =====================================================
// 🚀 APP
// =====================================================
const app = express();

// =====================================================
// 🌍 ORIGENS PERMITIDAS
// =====================================================
const allowedOrigins = [
  "https://d3n78ekyg3zlc1.cloudfront.net",
  "http://localhost:5173",
];

// =====================================================
// 🔐 CORS
// =====================================================
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origem não permitida: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =====================================================
// 📦 BODY PARSER
// =====================================================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// =====================================================
// 🚦 HEALTH CHECK
// =====================================================
app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    awsRegion: process.env.AWS_REGION || null,
    bucket: process.env.AWS_BUCKET_NAME || null,
  });
});

// =====================================================
// 🚏 ROTAS
// =====================================================
app.use(router);

// =====================================================
// ❌ TRATAMENTO DE ERROS
// =====================================================
app.use((err, req, res, next) => {
  console.error("❌ Erro:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erro interno do servidor",
  });
});

// =====================================================
// 🚀 START SERVER
// =====================================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log(`🚀 Backend iniciado com sucesso!`);
  console.log(`🌐 Porta: ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log("======================================");
});