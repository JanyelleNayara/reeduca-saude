import userService from '../services/UserService.js';

class UserController {
  async createUser(request, reply) {
    try {
      const newUser = request.body;
      if (!newUser.name || !newUser.email || !newUser.password) {
        return reply.code(400).send({ message: 'Digite todos os dados' });
      }

      const user = await userService.createUser(newUser);

      reply.code(201).send({ message: 'Usuário cadastrado', user });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
    }
  }

  async getUsers(request, reply) {
    try {
      const users = await userService.getUsers();

      if (users.length === 0) {
        reply.code(404).send({ message: 'Nenhum usuário encontrado.' });
      } else {
        reply.code(200).send({ message: 'Usuários encontrados', users });
      }

      reply.code(200).send(users);
    } catch (error) {
      console.error(error);

      reply.code(500).send({ error: 'Usuários não encontrados' });
    }
  }

  async getUserById(request, reply) {
    try {
      const { id } = request.params;

      const user = await userService.getUserByID(id);

      reply.code(200).send({ message: 'Usuário encontrado', user });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: '' });
    }
  }

  async updateUser(request, reply) {
    try {
      const { id } = request.params;
      const novosDados = request.body;

      if (!novosDados || Object.keys(novosDados).length === 0) {
        return reply.code(400).send({
          message: 'Nenhum dado enviado para atualização.',
        });
      }

      if (
        'email' in novosDados &&
        (!novosDados.email || novosDados.email.trim() === '')
      ) {
        return reply.code(400).send({
          message: 'O campo "email" não pode estar vazio.',
        });
      }

      if (
        'nome' in novosDados &&
        (!novosDados.nome || novosDados.nome.trim() === '')
      ) {
        return reply.code(400).send({
          message: 'O campo "nome" não pode estar vazio.',
        });
      }

      const user = await userService.updateUser(id, novosDados);

      reply.code(200).send({ message: 'Usuário atualizado', user });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
    }
  }

  async toggleUserStatus(request, reply) {
    try {
      const { id } = request.params;
      const { status } = request.body;

      const user = await userService.toggleUserStatus(id, status);

      reply.code(200).send({
        message: `Usuário ${status ? 'ativado' : 'desativado'}`,
        user,
      });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Usuário não desativado' });
    }
  }

  async deleteUser(request, reply) {
    try {
      const { id } = request.params;

      const user = await userService.deleteUser(id);

      reply.code(204).send({ message: 'Usuário deletado', user });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Usuário não deletado' });
    }
  }
}

export default new UserController();
