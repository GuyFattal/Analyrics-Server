import express from "express";
import {
  getAllArtists,
  getAllArtistSongs,
} from "../controllers/artistsController";

const router = express.Router();

router.get("/", getAllArtists);
router.get("/:name", getAllArtistSongs);

export default router;
