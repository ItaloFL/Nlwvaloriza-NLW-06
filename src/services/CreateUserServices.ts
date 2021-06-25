import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../repositories/userRepository"

import { hash } from 'bcryptjs'


interface IUserRequest{
    name: string
    email: string
    admin?: boolean
    password: string
}

class CreateUserServices{

    async execute({name, email, admin = false, password} : IUserRequest ): Promise<User>{

        const userRepository = getCustomRepository(UserRepository)

        if(!email){
            throw new AppError("email incorrect")
        }

        const userAlreadyExist = await userRepository.findOne({
            email
        })

        if(userAlreadyExist){
            throw new AppError("User already exist!")
        }

        const passwordHash = await hash(password, 8)

        const user = userRepository.create({
            name,
            email,
            admin,
            password : passwordHash
        })

        await userRepository.save(user)

        return user
    }
        

}


export { CreateUserServices }