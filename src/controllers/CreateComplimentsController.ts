import { Request, Response } from "express";
import { CreateComplimentsService } from "../services/CreateComplimentsService";



class CreateComplimentsController{

    async handle(request: Request, response: Response){
        const { tag_id, user_receiver, message } = request.body
        const { user_id } = request

        const createcomplimentService = new CreateComplimentsService()

        const compliment = await createcomplimentService.execute({
            tag_id, 
            user_receiver,
            user_sender: user_id, 
            message
        })

        return response.json(compliment)
    }



}


export { CreateComplimentsController }