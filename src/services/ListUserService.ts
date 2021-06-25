import { classToPlain } from "class-transformer"
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/userRepository"



class ListUserService{

 async execute(){

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.find()

    return classToPlain(user)
 }

}

export { ListUserService  }