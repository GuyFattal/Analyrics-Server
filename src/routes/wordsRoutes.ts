import express from "express";
import { getAllWords, getWordByID } from "../controllers/wordsController";

const router = express.Router();

router.get("/", getAllWords);
router.get("/:id", getWordByID);

export default router;
