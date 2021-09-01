import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupWords,
  insertWordToGroup,
} from "../controllers/groupsController";

const router = express.Router();

router.get("/", getAllGroups);
router.get("/:group_name", getGroupWords);
router.post("/", createGroup);
router.post("/word", insertWordToGroup);

export default router;
