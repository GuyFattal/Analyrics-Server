import express from "express";
import { getAllWords } from "../controllers/wordsController";

const router = express.Router();

router.get("/", getAllWords);

export default router;
