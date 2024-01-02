import express from "express";
const router = express.Router();

import { verifyIfLoggedIn } from "../middleware/verifyAuthToken.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

// Middleware to check if the user is logged in
router.use(verifyIfLoggedIn);

// Routes
router.post("/create", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
