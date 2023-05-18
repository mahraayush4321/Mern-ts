import { RequestHandler } from "express";
import noteModel from "../Models/Notes.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NotesModel from "../Models/Notes.model";
export const getNotes:RequestHandler=async(req,res,next)=>{
    try {
        const notes=await noteModel.find().exec();
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }

}

export const getNote:RequestHandler=async(req,res,next)=>{

    const noteId=req.params.noteId;

    try {

        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400,"Invalid note id")
        }
        const note=await noteModel.findById(noteId).exec();

        if(!note)
        {
            throw createHttpError(404,"Note not found ")
        }
        res.status(200).json(note)
    } catch (error) {
        next(error);
    }
};

interface createNoteBody {
    title?:string,
    text?:string,
}

export const createNotes:RequestHandler<unknown,unknown,createNoteBody,unknown>=async(req,res,next)=>{
   const title=req.body.title;
   const text=req.body.text;
    try {

        if(!title){
            throw createHttpError(400,"You must have a title for note ");
        }

        const newNote=await noteModel.create({
            title:title,
            text:text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface updateNotesParams {
    noteId:string,
}

interface updateNotesBody {
    title?:string,
    text?:string,
}

export const updateNotes:RequestHandler<updateNotesParams,unknown,updateNotesBody,unknown>=async(req,res,next)=>{
    const noteId=req.params.noteId;
    const newTitle=req.body.title;
    const newText=req.body.text;

    try {
        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400,"Invalid note id")
        }

        if(!newTitle){
            throw createHttpError(400,"You can't update a note without a new Title ");
        }

        const note=await NotesModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404,"No note found ");
        }

        note.title=newTitle;
        note.text=newText;

        const updatedNote = await note.save();

        //noteModel.findByIdAndUpdate(noteId)

        res.status(200).json(updatedNote)

    } catch (error) {
        next(error)
    }
}



export const deleteNote:RequestHandler=async(req,res,next)=>{
    const noteId=req.params.noteId;
    try {
        if(!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400,"Invalid note id")
        }

        const note = await NotesModel.findById(noteId).exec();

        if(!note) {
            throw createHttpError(404,"No note found ");
        }

        const deletedNote=await NotesModel.findByIdAndDelete(noteId)

        res.status(204).json(deletedNote)

    } catch (error) {
        next(error)
    }
}