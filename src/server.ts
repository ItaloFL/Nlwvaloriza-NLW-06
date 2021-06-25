import "reflect-metadata"

import { Request, Response, NextFunction} from 'express'

import express from  "express"
import "express-async-errors"

import { router } from '../routes'

import "./database"

import { AppError } from "./errors/AppError"



const app = express()

app.use(express.json())

app.use(router)

app.use((err: Error, request: Request, response: Response, next:NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
            
        })
        
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server Error - ${err.message}`
    })
})


app.listen(3333, () =>{
    console.log("running in port 3333")
})