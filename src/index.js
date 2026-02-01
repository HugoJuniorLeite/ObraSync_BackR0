import "dotenv/config";

console.log("SUPABASE_URL =>", process.env.SUPABASE_URL);

import express from "express";
import cors from "cors";
import router from "./e.routes/index.js";

const app = express();

const allowedOrigins = [
  "https://d3n78ekyg3zlc1.cloudfront.net",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    // permite chamadas sem origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// 🔑 NÃO use app.options("*")

app.use(express.json());

// Rotas
app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import router from "./e.routes/index.js";

// const app = express();

// app.use(cors({
//   origin: true,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use(router);

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Backend rodando na porta ${PORT}`);
// });

// export default app;
