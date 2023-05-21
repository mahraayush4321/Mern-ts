import * as notesController from '../Controllers/notes.controller'
import express from 'express';
const router=express.Router();

router.get("/",notesController.getNotes);

router.get("/:noteId",notesController.getNote);

router.post("/",notesController.createNotes);

router.patch("/:noteId",notesController.updateNotes)

router.delete("/:noteId",notesController.deleteNote)

export default router;