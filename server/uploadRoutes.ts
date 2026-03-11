import { Router, Request, Response } from "express";
import { storagePut } from "./storage";

const router = Router();

// Route POST /api/upload/blog-image
// Accepte une image en base64 et l'upload sur S3
router.post("/blog-image", async (req: Request, res: Response) => {
  try {
    const { imageData, mimeType, fileName } = req.body as {
      imageData: string;
      mimeType: string;
      fileName: string;
    };

    if (!imageData || !mimeType) {
      return res.status(400).json({ error: "imageData et mimeType sont requis" });
    }

    // Vérifier que c'est bien une image
    if (!mimeType.startsWith("image/")) {
      return res.status(400).json({ error: "Seules les images sont acceptées" });
    }

    // Décoder le base64
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Vérifier la taille (max 5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: "L'image ne doit pas dépasser 5 Mo" });
    }

    // Générer un nom de fichier unique
    const ext = mimeType.split("/")[1] || "jpg";
    const safeName = (fileName || "blog-image")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase()
      .substring(0, 50);
    const key = `blog-images/${safeName}-${Date.now()}.${ext}`;

    // Upload sur S3
    const { url } = await storagePut(key, buffer, mimeType);

    return res.json({ url, key });
  } catch (error: any) {
    console.error("[Upload Blog Image Error]", error);
    return res.status(500).json({ error: error.message || "Erreur lors de l'upload" });
  }
});

export function registerUploadRoutes(app: any) {
  app.use("/api/upload", router);
}
