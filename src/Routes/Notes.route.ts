import * as notesController from '../Controllers/notes.controller'
import express from 'express';
const router=express.Router();

router.get("/",notesController.getNotes);

export default router;