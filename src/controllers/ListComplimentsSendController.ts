import { Request, Response } from "express";
import { ListUserSendComplimentService } from "../services/ListUserSendComplimentService";




class ListComplimentsSendController{

    async handle(request: Request, response: Response){

        const { user_id } = request

        const listComplimentsSendService = new ListUserSendComplimentService()

        const compliments = await listComplimentsSendService.execute(user_id)

        return response.json(compliments)

    }


}


export { ListComplimentsSendController }