import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import notesRoutes from './Routes/Notes.route'
import createHttpError,{isHttpError} from 'http-errors';
const app=express();

app.use(express.json());

app.use(morgan("dev"));

const MONGO_URI_STRING='mongodb+srv://tanishqmahra:z7ZdHv6rKz8xF4eu@cluster0.kn5t9pn.mongodb.net/Tsmern?retryWrites=true&w=majority'
const Port=process.env.PORT || 5000

app.use("/api/notes",notesRoutes)

app.use((req,res,next)=>{
    next(createHttpError(404,"Endpoint not found")) // 404 ->resource not found error
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request,res:Response,next:NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error has occured";
    let statusCode=500;
    if(isHttpError(error)) {
        statusCode=error.status;
        errorMessage=error.message
    }
    res.status(statusCode).json({error:errorMessage})
})

mongoose.connect(MONGO_URI_STRING).then(()=>{
    console.log(`mongo db connected `);
    app.listen(Port,()=>{
        console.log('server running at port : ' + Port)
    });
}).catch(console.error);



