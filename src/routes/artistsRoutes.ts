import express from "express";
import { saveNewArtist } from "src/controllers/artistsController";

const router = express.Router();

router.post("/", saveNewArtist);

export default router;
