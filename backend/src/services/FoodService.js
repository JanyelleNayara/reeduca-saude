import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FoodService {
  async createFood(data) {
    return await prisma.food.create({
      data: {
        id: data.id,
        name: data.name,
        calories: data.calories,
        measure: data.measure,
        measurementUnit: data.measurementUnit,
        protein: data.protein,
        carbs: data.carbs,
        fats: data.fats,
        brand: data.brand,
      },
    });
  }

  async getFoods() {
    return await prisma.food.findMany();
  }

  async getFoodById(id) {
    try {
      const food = await prisma.food.findUnique({
        where: {
          id,
        },
      });

      return food;
    } catch (error) {
      if (error.code == 'P2025') {
        console.error('Erro Prisma: Registro não encontrado para o ID:', id);
        return null;
      }
    }

    console.error(error);
    throw error;  
  }

  async updateFood(id, novosDados) {
    try {
      const food = await prisma.food.update({
        where: {
          id: id,
        },
        data: {
          ...novosDados,
        },
      });
      return food;
    } catch (error) {
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado para o ID:', id);
        return null; // Retorna `null` para indicar ausência de registro
      }

      console.error('Erro inesperado no serviço:', error);
      throw error; // Relança erros inesperados
    }
  }

  async deleteFood(id) {
    try {
      const food = await prisma.food.delete({
        where: { id },
      });

      return food;
    } catch (error) {
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado para o ID:', id);
        return null; // Retorna `null` para indicar ausência de registro
      }

      console.error('Erro inesperado no serviço:', error);
      throw error; // Relança erros inesperados
    }
  }
}

export default new FoodService();
