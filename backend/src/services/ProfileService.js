import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProfileService {
  async createProfile(newProfile) {
    try {
      return await prisma.profile.create({
        data: {
          ...newProfile,
        },
      });
    } catch (error) {
      console.error('Perfil não cadastrado', error);
      throw error;
    }
  }

  async getProfiles() {
    return await prisma.profile.findMany();
  }

  async getProfileById(id) {
    try {
      return await prisma.profile.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado para o ID:', id);
        return null; // Retorna `null` para indicar ausência de registro
      }

      console.error('Erro inesperado no serviço:', error);
      throw error; // Relança erros inesperados
    }
  }

  async updateProfile(id, novosDados) {
    try {
      const profileId = await prisma.profile.findUnique({
        where: {
          id,
        },
      });

      if (profileId) {
        return await prisma.profile.update({
          where: {
            id,
          },
          data: {
            ...novosDados,
          },
        });
      }
    } catch (error) {
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado para o ID:', id);
        return null; // Retorna `null` para indicar ausência de registro
      }

      console.error('Erro inesperado no serviço:', error);
      throw error; // Relança erros inesperados
    }
  }

  async deleteProfile(id) {
    try {
      const profile = await prisma.profile.delete({
        where: {
          id,
        },
      });

      return profile;
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

export default new ProfileService();
