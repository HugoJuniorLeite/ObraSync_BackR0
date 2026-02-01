import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";
import router from "./e.routes/index.js";

console.log("SUPABASE_URL =>", process.env.SUPABASE_URL);

const app = express();

/**
 * =====================================================
 * 🌍 ORIGENS PERMITIDAS
 * =====================================================
 */
const allowedOrigins = [
  "https://d3n78ekyg3zlc1.cloudfront.net",
  "http://localhost:5173",
];

/**
 * =====================================================
 * 🔐 CORS (COMPATÍVEL COM EXPRESS 5)
 * =====================================================
 */
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * =====================================================
 * 📦 BODY PARSER
 * =====================================================
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * =====================================================
 * 🚦 HEALTH CHECK
 * =====================================================
 */
app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * =====================================================
 * 🚏 ROTAS
 * =====================================================
 */
app.use(router);

/**
 * =====================================================
 * 🚀 START SERVER
 * =====================================================
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
