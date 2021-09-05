import express from "express";
import { getBackup } from "../controllers/backupController";

const router = express.Router();

router.get("/", getBackup);

export default router;
