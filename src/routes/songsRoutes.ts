import express from "express";
import { getAllSongs, saveNewSong } from "../controllers/songsControllers";

const router = express.Router();

router.post("/", saveNewSong);
router.get("/", getAllSongs);

export default router;
