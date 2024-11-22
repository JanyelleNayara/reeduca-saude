
import userService from "../services/user.service.js";

class UserController {

    async createUser( request, reply) {

        try {
            const {name, email, password} = request.body

            console.log(name, email, password);

            if (!name || !email || !password) {
                return reply.code(400).send({error: 'Digite todos os dados'})
            }

            const user = await userService.createUser(name, email, password)
            console.log(user);

            reply.code(201).send(user)
            console.log(user);

        } catch (error) {
            console.error(error)
            reply.code(500).send({error: 'usuário não cadastrado'})
        }

    }

    async getUsers( request, reply){
        try {
            const users = await userService.getUsers()
            reply.code(200).send(users)
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ''})
        }
    }

    async getUserById( request, reply){
        try {

            const { id } = request.params

            const user = await userService.getUserByID(id)

            reply.code(200).send({message: 'Usuário encontrado', user})

        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ''})
        }
    }

    async updateUser(request, reply) {
        try {

            const { id } = request.params
            const { name, email, password } = request.body

            const user = await userService.updateUser(id, name, email, password)
            reply.code(200).send('Usuário alterado')
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ' Usuário não alterado '})
            
        }
    }

    async deleteUser(request, reply) {
        try {

            const { id } = request.params

            const user = await userService.deleteUser(id)

            reply.code(200).send('Usuário deletado')
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: 'Usuário não deletado'})
            
        }
    }

}

export default new UserController()