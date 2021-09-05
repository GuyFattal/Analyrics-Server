import express from "express";
import {
  createPhrase,
  deletePhrase,
  getAllPhrases,
  getPhrasesSongs,
} from "../controllers/phrasesController";

const router = express.Router();
router.get("/", getAllPhrases);
router.post("/", createPhrase);
router.delete("/:phrase", deletePhrase);
router.get("/:phrase", getPhrasesSongs);

export default router;
