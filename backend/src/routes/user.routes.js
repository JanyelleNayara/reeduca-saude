import UserController from "../controllers/UserController.js";

export default async function userRoutes(fastify, options){
    fastify.post('/users', UserController.createUser);
    fastify.get('/users', UserController.getUsers);
    fastify.get('/users/:id', UserController.getUserById);
    fastify.put('/users/:id', UserController.updateUser);
    fastify.patch('/users/:id', UserController.toggleUserStatus);
    fastify.delete('/users/:id', UserController.deleteUser);
}