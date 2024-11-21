import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async function cadastrar (fastify, options) {

    fastify.post('/users',async (request, reply) => {

        try {
            const { name, email, password } = request.body

            if (!name || !email || !password) {
                return reply.code(400).send({error: 'Digite todos os dados'})
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })

            reply.code(201).send(user)

        } catch (error) {
            console.error(error)
            reply.code(500).send({error: 'usuário não cadastrado'})
        }
    })

    fastify.get('/users', async (request, reply) => {

        try {
            const users = await prisma.user.findMany()
            reply.code(200).send(users)
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ''})
        }

    });

    fastify.get('/users/:id', async (request, reply) => {

        try {

            const { id } = request.params

            const user = await prisma.user.findUnique({
                where:{
                    id: parseInt(id)
                }
            })
            
            if (!user) {
                return reply.code(404).send({error: 'Usuário não encontrado'})
            }

            reply.code(200).send({message: 'Usuário encontrado', user})

        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ''})
        }
    })

    fastify.put('/users/:id', async (request, reply) => {

        try {

            const { id } = request.params
            const { name, email, password } = request.body

            const user = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    email,
                    password,
                    updated_at: new Date()
                }
            })
            reply.code(200).send('Usuário alterado')
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: ' Usuário não alterado '})
            
        }
    })

    fastify.delete('/users/:id', async (request, reply) => {

        try {

            const { id } = request.params

            const user = await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            })

            reply.code(200).send('Usuário deletado')
            
        } catch (error) {
            console.error(error)
            reply.code(500).send({error: 'Usuário não deletado'})
            
        }
    })
}