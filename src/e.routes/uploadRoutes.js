// import express from "express"
// import multer from "multer"
// import supabase from "../supabaseClient.js"

// const router = express.Router()
// const upload = multer({ storage: multer.memoryStorage() }) // guarda os arquivos na memória

// router.post("/upload", upload.fields([
//   { name: "fotoCalcadaAntes" },
//   { name: "fotoCroqui" },
//   { name: "fotoFrenteImovel" },
//   { name: "fotoPlacaRua" },
//   { name: "fotoProtecaoMecanica" },
//   { name: "fotoProvisorio" },
//   { name: "fotoRamalCortado" },
//   { name: "fotoRamalExposto" }
// ]), async (req, res) => {
//   try {
//     const files = req.files
//     const fotosUrls = {}

//     for (const key in files) {
//       const file = files[key][0]
//       const { data, error } = await supabase.storage
//         .from("fotos") // nome do bucket que você criou
//         .upload(`projeto/${Date.now()}_${file.originalname}`, file.buffer, {
//           contentType: file.mimetype,
//         })
//       if (error) throw error

//       const { data: publicUrl } = supabase.storage
//         .from("fotos")
//         .getPublicUrl(data.path)

//       fotosUrls[key] = publicUrl.publicUrl
//     }

//     res.json({ fotos: fotosUrls })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ error: err.message })
//   }
// })

// export default router


import express from "express";
import multer from "multer";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3Client.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  upload.fields([
    { name: "fotoCalcadaAntes" },
    { name: "fotoCroqui" },
    { name: "fotoFrenteImovel" },
    { name: "fotoPlacaRua" },
    { name: "fotoProtecaoMecanica" },
    { name: "fotoProvisorio" },
    { name: "fotoRamalCortado" },
    { name: "fotoRamalExposto" },
  ]),
  async (req, res) => {
    try {
      const files = req.files;
      const fotosUrls = {};

      for (const keyName in files) {
        const file = files[keyName][0];

        const fileName =
          `projeto/${Date.now()}_${file.originalname}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
        );

        const publicUrl =
          `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        fotosUrls[keyName] = publicUrl;
      }

      return res.json({
        fotos: fotosUrls,
      });
    } catch (err) {
      console.error("Erro upload S3:", err);

      return res.status(500).json({
        error: err.message,
      });
    }
  }
);

export default router;
