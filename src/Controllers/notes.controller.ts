import { RequestHandler } from "express";
import noteModel from "../Models/Notes.model";
export const getNotes:RequestHandler=async(req,res,next)=>{
    try {
        //throw error ('lol')
        const notes=await noteModel.find().exec();
        res.status(200).json(notes)
    } catch (error) {
        next(error)
    }

}

export const createNotes:RequestHandler=async(req,res,next)=>{
   const title=req.body.title;
   const text=req.body.text;
    try {
        const newNote=await noteModel.create({
            title:title,
            text:text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}