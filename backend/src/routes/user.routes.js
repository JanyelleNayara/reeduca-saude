import UserController from "../controllers/user.controller.js";

export default async function userRoutes(fastify, options){
    fastify.post('/users', UserController.createUser);
    fastify.get('/users', UserController.getUsers);
    fastify.get('/users/:id', UserController.getUserById);
    fastify.put('/users/:id', UserController.updateUser);
    fastify.delete('/users/:id', UserController.deleteUser);
}