import { getCustomRepository } from "typeorm"
import { Tags } from "../entities/Tags"
import { AppError } from "../errors/AppError"
import { TagsRepository } from "../repositories/tagsRepository"

interface ItagsRequest{
    name: string
}


class CreateTagsService {

    async execute({name}: ItagsRequest):Promise<Tags>{
        const tagsRepository = getCustomRepository(TagsRepository)

        if(!name){
            throw new AppError("Name not found, try again")
        }

        const tagAlreadyExist = await tagsRepository.findOne({
            name
        })

        if(tagAlreadyExist){
            throw new AppError("Tag already Exist")
        }

        const user = tagsRepository.create({
            name
        })

        const finaluser = await tagsRepository.save(user);

        return finaluser;
    }

}


export { CreateTagsService }