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
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.error('Erro inesperado no serviço:', error);
      throw {
        status: 500,
        message: 'Erro interno no serviço de localização de usuários.',
      };
    }
  }

  async getUserByID(id) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error('Erro inesperado no serviço:', error);
      throw {
        status: 500,
        message: 'Erro interno no serviço de localização de usuário por ID.',
      };
    }
  }

  async updateUser(id, novosDados) {
    const { createdAt, updatedAt, ...dadosParaAtualizar } = novosDados; // Remove createdAt e updatedAt
    try {
      const usuarioAtual = await prisma.user.findUnique({
        where: { id },
      });

      const valoresIguais = Object.keys(dadosParaAtualizar).every(
        (campo) => dadosParaAtualizar[campo] === usuarioAtual[campo],
      );

      if (valoresIguais) {
        throw {
          status: 400,
          message: 'Os dados enviados são iguais aos já existentes',
        };
      }

      const user = await prisma.user.update({
        where: { id },
        data: { ...dadosParaAtualizar },
      });

      return user;
    } catch (error) {
      // Se for um erro esperado, repropaga sem alterar
      if (error.status && error.message) {
        throw error; // Repassa o erro ao controlador
      }
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado', error);
        throw {
          status: 404,
          message: 'Usuário não encontrado no banco de dados.',
        };
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
    try {
      const usuarioAtual = await prisma.user.findUnique({
        where: { id },
      });

      if (!usuarioAtual) {
        throw { status: 404, message: 'Usuário não encontrado' };
      }

      if (usuarioAtual.status === status) {
        throw {
          status: 400,
          message: 'Status enviado igual ao existente',
        };
      }

      // Atualiza o status do usuário
      const user = await prisma.user.update({
        where: { id },
        data: {
          status: status,
        },
      });

      // Atualiza o status do perfil associado ao usuário
      await prisma.profile.update({
        where: { userId: id },
        data: {
          status: status, // Aqui você pode atualizar o status do perfil
        },
      });
      return user;
    } catch (error) {
      // Se for um erro esperado, repropaga sem alterar
      if (error.status && error.message) {
        throw error; // Repassa o erro ao controlador
      }

      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado', error);
        throw {
          status: 404,
          message: 'Usuário não encontrado no banco de dados.',
        };
      }
      console.error('Erro inesperado no serviço:', error);

      throw {
        status: 500,
        message:
          'Erro interno no serviço de ativação ou invativação do usuário.',
      };
    }
  }

  // deletar o usuário
  async deleteUser(id) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      // Erro de registro inexistente (Prisma)
      if (error.code === 'P2025') {
        console.error('Erro Prisma: Registro não encontrado', error);

        throw {
          status: 404,
          message: 'Usuário não encontrado no banco de dados.',
        };
      }

      // Outros erros inesperados
      console.error('Erro inesperado no serviço:', error);
      throw {
        status: 500,
        message: 'Erro interno no serviço de deleção do usuário.',
      };
    }
  }
}

export default new UserService();
