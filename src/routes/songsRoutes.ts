import express from "express";
import multer from "multer";

import {
  getAllSongs,
  getAllYears,
  getSongById,
  getSongsByYear,
  saveNewSong,
} from "../controllers/songsControllers";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("song"), saveNewSong);
router.get("/", getAllSongs);
router.get("/year/:year", getSongsByYear);
router.get("/year", getAllYears);
router.get("/:id", getSongById);

export default router;
