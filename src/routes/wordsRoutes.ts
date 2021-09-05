import express from "express";
import {
  getAllWords,
  getWordByID,
  getWordGroups,
} from "../controllers/wordsController";

const router = express.Router();

router.get("/", getAllWords);
router.get("/:id", getWordByID);
router.get("/groups/:id", getWordGroups);

export default router;
