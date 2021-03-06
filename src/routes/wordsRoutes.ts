import express from "express";
import {
  getAllWords,
  getCommonWords,
  getWordByID,
  getWordByIndex,
  getWordGroups,
} from "../controllers/wordsController";

const router = express.Router();

router.get("/", getAllWords);
router.get("/common", getCommonWords);
router.get("/:id", getWordByID);
router.get("/groups/:id", getWordGroups);
router.get("/:SID/:section/:section_row/:row_offset", getWordByIndex);

export default router;
