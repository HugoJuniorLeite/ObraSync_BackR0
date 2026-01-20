/* import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./e.routes/index.js"


const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://obra-sync-front.onrender.com', // seu frontend
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//   credentials: true
// }));
app.use(router)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

export default app; */


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import router from "./e.routes/index.js";

const app = express();

/**
 * 1️⃣ CORS – sempre ANTES das rotas
 */
app.use(cors({
  origin: [
    "https://d3n78ekyg3zlc1.cloudfront.net",
    // "https://obra-sync-front.onrender.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/**
 * 2️⃣ PRE-FLIGHT (ESSENCIAL)
 */
app.options("*", cors());

/**
 * 3️⃣ Body parser
 */
app.use(express.json());

/**
 * 4️⃣ ROTAS (continua obrigatório)
 */
app.use(router);

/**
 * 5️⃣ Server
 */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

export default app;
