import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {

    async createUser (name, email, password) {
        return await prisma.user.create({
            data: {
                name,
                email,
                password,
                created_at: new Date(),
                updated_at: new Date()
            }
        })            
    }

    async getUsers(){
        return await prisma.user.findMany()
    }

    async getUserByID(id){
        return await prisma.user.findUnique({
            where:{
                id: parseInt(id)
            }
        })
    }

    async updateUser( id, name, password){
        return await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                password,
                updated_at: new Date()
            }
        })

    }

    async deleteUser(id) {
        return await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        })        
    }
}

export default new UserService()