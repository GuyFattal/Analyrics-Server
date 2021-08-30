import express from "express";
import {
  getAllWriters,
  getAllWritersSongs,
} from "../controllers/writersController";

const router = express.Router();

router.get("/", getAllWriters);
router.get("/:name", getAllWritersSongs);

export default router;
