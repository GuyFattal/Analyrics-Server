import express from "express";
import multer from "multer";

import { getBackup, loadFromFile } from "../controllers/backupController";

const router = express.Router();
const upload = multer();

router.get("/", getBackup);
router.post("/", upload.single("backup"), loadFromFile);

export default router;
