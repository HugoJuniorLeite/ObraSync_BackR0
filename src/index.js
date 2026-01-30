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

export default app;
