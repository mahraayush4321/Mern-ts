import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import notesRoutes from './Routes/Notes.route'
const app=express();

const MONGO_URI_STRING='mongodb+srv://tanishqmahra:z7ZdHv6rKz8xF4eu@cluster0.kn5t9pn.mongodb.net/Tsmern?retryWrites=true&w=majority'
const Port=process.env.PORT || 5000

app.use("/api/notes",notesRoutes)

app.use((req,res,next)=>{
    next(Error("Endpoint not found"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request,res:Response,next:NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error has occured";
    if(error instanceof Error) errorMessage=error.message;
    res.status(500).json({error:errorMessage})
})

mongoose.connect(MONGO_URI_STRING).then(()=>{
    console.log(`mongo db connected `);
    app.listen(Port,()=>{
        console.log('server running at port : ' + Port)
    });
}).catch(console.error);



