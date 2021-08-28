import express from "express";
import { getAllGenres } from "../controllers/genresController";

const router = express.Router();

router.get("/", getAllGenres);

export default router;
