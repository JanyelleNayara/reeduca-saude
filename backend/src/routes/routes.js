import UserController from '../controllers/UserController.js';
import ProfileController from '../controllers/ProfileController.js';
import FoodController from '../controllers/FoodController.js';

export default async function routes(fastify, options) {
  fastify.post('/users', UserController.createUser);
  fastify.get('/users', UserController.getUsers);
  fastify.get('/users/:id', UserController.getUserById);
  fastify.put('/users/:id', UserController.updateUser);
  fastify.patch('/users/:id', UserController.toggleUserStatus);
  fastify.delete('/users/:id', UserController.deleteUser);

  fastify.post('/profiles', ProfileController.createProfile);
  fastify.get('/profiles', ProfileController.getProfiles);
  fastify.get('/profiles/:id', ProfileController.getProfileById);
  fastify.put('/profiles/:id', ProfileController.updateProfile);
  fastify.delete('/profiles/:id', ProfileController.deleteProfile);

  fastify.post('/foods', FoodController.createFood);
  fastify.get('/foods', FoodController.getFoods);
  fastify.get('/foods/:id', FoodController.getFoodById);
  fastify.put('/foods/:id', FoodController.updateFood);
  fastify.delete('/foods/:id', FoodController.deleteFood);
}
