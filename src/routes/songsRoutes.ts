import express from "express";
import {
  getAllSongs,
  getSongById,
  getSongsByYear,
  saveNewSong,
} from "../controllers/songsControllers";

const router = express.Router();

router.post("/", saveNewSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.get("/year/:year", getSongsByYear);

export default router;
