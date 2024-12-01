import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async createUser(newUser) {
    try {
      return await prisma.user.create({
        data: {
          ...newUser,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        console.error('Erro Prisma: Conflito de dados únicos', error);
        throw {
          status: 409,
          message: 'Já existe um usuário com este email.',
        };
      }
      console.error('Erro inesperado no serviço:', error);
      throw {
        status: 500,
        message: 'Erro interno no serviço de cadastro de usuário.',
      };
    }
  }

  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserByID(id) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateUser(id, novosDados) {
    try {
      
      const usuarioAtual = await prisma.user.findUnique({
        where: { id },
      });

      if (!usuarioAtual) {
        throw { status: 404, message: 'Usuário não encontrado' };
      }

      const valoresIguais = Object.keys(novosDados).every(
        (campo) => novosDados[campo] === usuarioAtual[campo],
      );

      if (valoresIguais) {
        throw {
          status: 400,
          message: 'Os dados enviados são iguais aos já existentes',
        };
      }

      const user = await prisma.user.update({
        where: { id },
        data: { ...novosDados },
      });

      return user;
    } catch (error) {
      // Se for um erro esperado, repropaga sem alterar
      if (error.status && error.message) {
        throw error; // Repassa o erro ao controlador
      }
      if (error.code === 'P2002') {
        console.error('Erro Prisma: Conflito de dados únicos', error);

        throw { status: 409, message: 'Já existe um usuário com este email.' };
      }
      console.error('Erro inesperado no serviço:', error);

      throw {
        status: 500,
        message: 'Erro interno no serviço de cadastro de usuário.',
      };
    }
  }

  async toggleUserStatus(id, status) {
    return await prisma.user.update({
      where: {
        id: id,
      },

      data: {
        status: status,
      },
    });
  }

  // deletar o usuário
  async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default new UserService();
