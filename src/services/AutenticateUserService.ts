import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/userRepository"
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import { AppError } from '../errors/AppError'


interface IUserRequest{
    email: string;
    password: string;
}

interface IResponse{
    user:{
        email: string
        admin: boolean
    }
    token: string
}


class AutenticateUserService{

    async execute({ email, password }: IUserRequest): Promise<IResponse>{

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({email})

        if(!user){
            throw new AppError("User or password not found", 401)
        }

        const passwordMatch = await compare(password, user.password)
    

        if(!passwordMatch){
            throw new AppError("User or password not found", 401)
        }

        const token = sign({},"6fa18a0ac995377c6582912a7524018c",{
            subject: user.id, 
            expiresIn: "1d"
        })


        const tokenRetrun: IResponse = {
            token,
            user:{
                email: user.email,
                admin: user.admin
            }
        }

        return tokenRetrun
    }   

}


export { AutenticateUserService }