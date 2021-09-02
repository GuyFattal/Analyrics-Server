import express from "express";
import {
  getAllSongs,
  getAllYears,
  getSongById,
  getSongsByYear,
  saveNewSong,
} from "../controllers/songsControllers";

const router = express.Router();

router.post("/", saveNewSong);
router.get("/", getAllSongs);
router.get("/year/:year", getSongsByYear);
router.get("/year", getAllYears);
router.get("/:id", getSongById);

export default router;
