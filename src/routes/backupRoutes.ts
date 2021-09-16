import express from "express";
import multer from "multer";

import { getBackup, getXMLBackup, loadFromFile } from "../controllers/backupController";
import { asyncify } from "./../utils/asyncify";

const router = express.Router();
const upload = multer();

router.get("/", getBackup);
router.get("/xml", getXMLBackup);
router.post("/", asyncify(upload.single("backup")), loadFromFile);

export default router;
