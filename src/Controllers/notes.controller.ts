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