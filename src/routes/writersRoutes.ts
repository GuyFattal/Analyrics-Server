import express from "express";
import { getAllWriters } from "../controllers/writersController";

const router = express.Router();

router.get("/", getAllWriters);

export default router;
