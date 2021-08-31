import express from "express";
import {
  getAllSongs,
  getSongById,
  saveNewSong,
} from "../controllers/songsControllers";

const router = express.Router();

router.post("/", saveNewSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);

export default router;
