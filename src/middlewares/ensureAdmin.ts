import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/userRepository";




export async function ensureAdmin(request: Request, response: Response, next :NextFunction) {

    const { user_id } = request

    const userRepository = getCustomRepository(UserRepository)

    const { admin } = await userRepository.findOne(user_id)

    if(admin){
        return next()
    }

    return response.status(401).json({
        error: "Unauthorized"
    })


    
}