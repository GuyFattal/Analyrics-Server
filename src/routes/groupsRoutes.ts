import express from "express";
import {
  createGroup,
  getAllGroups,
  getGroupWords,
  insertWordToGroup,
  removeWordFromGroup,
} from "../controllers/groupsController";

const router = express.Router();

router.get("/", getAllGroups);
router.post("/", createGroup);
router.post("/word", insertWordToGroup);
router.post("/remove", removeWordFromGroup);
router.get("/:group_name", getGroupWords);

export default router;
