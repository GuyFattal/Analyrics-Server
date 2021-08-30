import express from "express";
import {
  getAllGenres,
  getAllGenreSongs,
} from "../controllers/genresController";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:name", getAllGenreSongs);

export default router;
