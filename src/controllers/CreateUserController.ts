import { Request, Response } from 'express'
import { CreateUserServices } from '../services/CreateUserServices'


class CreateUserController{

    async handle(request: Request, response: Response): Promise<Response>{

        const { name, email, admin, password} = request.body

        const createUserService = new CreateUserServices()

        const user = await createUserService.execute({
            name,
            email,
            admin,
            password
        })

        return response.status(201).json({
            message: "Usuario criado com sucesso"
        })
    }
}

export { CreateUserController }