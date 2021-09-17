import express from "express";
import multer from "multer";

import { getXMLBackup, loadXML } from "../controllers/backupController";

const router = express.Router();
const upload = multer();

router.get("/", getXMLBackup);
router.post("/", upload.single("backup"), loadXML);

export default router;
