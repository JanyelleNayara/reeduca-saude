import userService from '../services/UserService.js';

class UserController {
  async createUser(request, reply) {
    try {
      const newUser = request.body;
      if (!newUser.name || !newUser.email || !newUser.password) {
        return reply
          .code(400)
          .send({ message: 'Campos obrigatórios ausentes' });
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
        reply.code(404).send({ message: 'Registros não encontrados.' });
      }

      reply.code(200).send({ message: 'Usuários encontrados', users });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
    }
  }

  async getUserById(request, reply) {
    try {
      const { id } = request.params;

      const user = await userService.getUserByID(id);

      if (!user) {
        reply.code(404).send({ message: 'Registro não encontrado.' });
      }

      reply.code(200).send({ message: 'Usuário encontrado', user });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
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
        'name' in novosDados &&
        (!novosDados.name || novosDados.name.trim() === '')
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

      if (typeof status !== 'boolean' || status === undefined) {
        return reply.code(400).send({
          message: 'Status não enviado para atualização.',
        });
      }

      const user = await userService.toggleUserStatus(id, status);

      reply.code(200).send({
        message: `Usuário ${status ? 'ativado' : 'desativado'}`,
        user,
      });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
    }
  }

  async deleteUser(request, reply) {
    try {
      const { id } = request.params;

      if(!id) {
        return reply.code(400).send({
          message: 'Usuário não informado.',
        });
      }

      const user = await userService.deleteUser(id);

      console.log(user);

      if (!user) {
        reply.code(400).send({ message: 'Usuário não encontrado' });
      }

      reply.code(204).send({ message: 'Usuário deletado' });
    } catch (error) {
      console.error(error);

      const status = error.status || 500;
      const message = error.message || 'Erro interno no servidor.';

      reply.code(status).send({ message });
    }
  }
}

export default new UserController();

// Situação	Código HTTP	Mensagem
// Requisição com dados ausentes	400 Bad Request	Campos obrigatórios ausentes.
// Registro duplicado	409 Conflict	Já existe um registro com este valor.
// Registro não encontrado	404 Not Found	Registro não encontrado.
// Usuário sem autenticação	401 Unauthorized	Autenticação requerida.
// Usuário sem permissão	403 Forbidden	Permissão negada.
// Erro do servidor	500 Internal Server Error	Ocorreu um erro no servidor.

// Código do Prisma	Descrição	HTTP Status
// P2002	Conflito de chave única (e.g., email duplicado).	409 Conflict
// P2025	Registro não encontrado (ex.: update ou delete em ID inexistente).	404 Not Found
// P2003	Violação de restrição de chave estrangeira.	400 Bad Request
// P2004	Restrições de check falharam (valores inválidos no esquema).	422 Unprocessable Entity
// P2014	Violação de restrição de relação no banco de dados.	400 Bad Request
// P2016	Requisição inválida para um modelo que não existe no Prisma schema.	500 Internal Server Error
