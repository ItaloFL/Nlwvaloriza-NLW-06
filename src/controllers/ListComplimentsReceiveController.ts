import { Request, Response } from "express";
import { ListUserReceiveComplimentService } from "../services/ListUserReceiveComplimentService";




class ListComplimentsReceiveController{

    async handle(request: Request, response: Response){

        const { user_id } = request

        const listComplimentsReceiveService = new ListUserReceiveComplimentService()

        const compliments = await listComplimentsReceiveService.execute(user_id)

        return response.json(compliments)

    }


}


export { ListComplimentsReceiveController }