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

app.use(cors({
  origin: [
    "https://d3n78ekyg3zlc1.cloudfront.net",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// app.options("*", cors());

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

export default app;
