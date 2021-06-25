
import { Request, Response, NextFunction} from 'express'
import { AppError } from '../errors/AppError'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../repositories/userRepository'
import { getCustomRepository } from 'typeorm'
import { User } from '../entities/User'

interface IPayLoad{
    sub: string
}

export async function ensureAutenticate(request: Request, response: Response, next: NextFunction){

    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("Unauthorization",401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "6fa18a0ac995377c6582912a7524018c") as IPayLoad
        

        request.user_id = sub
    

        return next()
    } catch {
        throw new AppError("Token Invalido", 401)
    }

}