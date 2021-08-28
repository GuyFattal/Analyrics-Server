import express from "express";
import { getAllGroups } from "../controllers/groupsController";

const router = express.Router();

router.get("/", getAllGroups);

export default router;
