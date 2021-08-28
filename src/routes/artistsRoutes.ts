import express from "express";
import { getAllArtists } from "../controllers/artistsController";

const router = express.Router();

router.get("/", getAllArtists);

export default router;
