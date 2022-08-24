import { Router } from 'express';
import { auth } from '../middlewares/verifyToken.js';
import {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  likeStory,
} from "../controllers/storyControllers.js";

const router = Router();

// get , add, edit , delete, likestory
router.get("/getstories", getStories);
router.post("/createstory", auth, createStory);
router.put("/updatestory/:id", auth, updateStory);
router.delete("/deletestory/:id", auth, deleteStory);
router.put("/likestory/:id", auth, likeStory);

export default router;
