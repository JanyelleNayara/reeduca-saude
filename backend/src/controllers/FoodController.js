import foodService from '../services/FoodService.js';

class FoodController {
  async createFood(request, reply) {
    try {
      const {
        id,
        name,
        calories,
        measure,
        measurementUnit,
        protein,
        carbs,
        fats,
        brand,
      } = request.body;

      if (!name) {
        return reply.code(400).send({ error: 'Digite um nome válido' });
      }

      const food = await foodService.createFood({
        id,
        name,
        calories,
        measure,
        measurementUnit,
        protein,
        carbs,
        fats,
        brand,
      });

      reply.code(201).send(food);
    } catch (error) {
      reply.code(500).send({ error: 'Alimento não criado', error });
    }
  }

  async getFoods(request, reply) {
    try {
      const foods = await foodService.getFoods();
      reply.code(200).send(foods);
    } catch (error) {
      reply.code(500).send({ error: 'Nenhum alimento encontrado!' });
    }
  }

  async getFoodById(request, reply) {
    try {
      const { id } = request.params;

      const food = await foodService.getFoodById(id);

      if (!food) {
        reply.code(400).send({ error: 'Alimento não encontrado!' });
      }

      reply.code(200).send({ message: 'Alimento encontrado', food });
    } catch (error) {
      reply.code(500).send({ error: 'Alimento não encontrado!' });
    }
  }

  async updateFood(request, reply) {
    try {
      const { id } = request.params;

      const novosDados = request.body;

      const food = await foodService.updateFood(id, novosDados);

      if (!food) {
        reply.code(400).send({ error: 'Alimento não encontrado!' });
      }

      reply.code(200).send({ message: 'Alimento atualizado', food });
    } catch (error) {
      reply.code(500).send({ error: 'Alimento não atualizado!', error });
    }
  }

  async deleteFood(request, reply) {
    try {
      const { id } = request.params;

      const food = await foodService.deleteFood(id);
      if (!food) {
        return reply.code(404).send({ error: 'Alimento não encontrado!' });
      }

      reply.code(200).send({ message: 'Produto deletado', food });
    } catch (error) {
      reply.code(500).send({ error: 'Alimento não deletado!', error });
      console.error(error);
    }
  }
}

export default new FoodController();
