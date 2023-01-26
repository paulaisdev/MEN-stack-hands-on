import express from "express";
const router = express.Router();

import controller from "../controllers/noteControllers.js";
import authController from "../controllers/authControllers.js";

router.get("/", controller.getAll);
//router.get("/", authController.checkToken, controller.getAll);
router.post("/", controller.createNote);

router.get("/:id", controller.getNoteById);
router.patch("/:id", controller.updateNoteById);
router.delete("/:id", controller.deleteNoteById);

export default router;
