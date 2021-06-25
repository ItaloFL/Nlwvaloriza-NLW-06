import { response } from "express"
import { getCustomRepository } from "typeorm"
import { AppError } from "../errors/AppError"
import { ComplimentsRepository } from "../repositories/complimentsRepository"
import { UserRepository } from "../repositories/userRepository"



interface IComplimentsRequest{

    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string
}


class CreateComplimentsService{

    async execute({ tag_id, user_receiver, user_sender, message}: IComplimentsRequest){


        const complimentsRepository = getCustomRepository(ComplimentsRepository)
        const usersRepository = getCustomRepository(UserRepository)

        if(user_sender === user_receiver){
            throw new AppError("Usuario incorrect")
        }

        const userReceiverExist = await usersRepository.findOne(user_receiver)

        if(!userReceiverExist){
            throw new AppError("Usuario does not exist!")
        }


        const compliments = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        const compliment = await complimentsRepository.save(compliments)

        return compliment
    }


}


export { CreateComplimentsService }