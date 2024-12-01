import profileService from '../services/ProfileService.js';

class ProfileController {
  async createProfile(request, reply) {
    try {
      const newProfile = request.body;

      console.log(newProfile);

      if (
        !newProfile.weightGoal ||
        !newProfile.userId ||
        !newProfile.height ||
        !newProfile.age
      ) {
        return reply.code(400).send({ error: 'Dados do perfil incompletos' });
      }

      const profile = await profileService.createProfile(newProfile);

      reply.code(201).send(profile);
    } catch (error) {
      console.error(error);

      reply.code(500).send({ error: 'Perfil não criado' });
    }
  }

  async getProfiles(request, reply) {
    try {
      const profiles = await profileService.getProfiles();
      reply.code(200).send(profiles);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Perfis não encontrados' });
    }
  }

  async getProfileById(request, reply) {
    try {
      const { id } = request.params;

      const profile = await profileService.getProfileById(id);

      if (!profile) {
        reply.code(400).send({ message: 'Perfil não encontrado' });
      }

      reply.code(200).send({ message: 'Perfil encontrado', profile });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Perfil não encontrado' });
    }
  }

  async updateProfile(request, reply) {
    try {
      const { id } = request.params;
      const novosDados = request.body;

      if (!novosDados) {
        reply.code(400).send({ message: 'Campos não preenchidos' });
      }

      const profile = await profileService.updateProfile(id, novosDados);

      if (!profile) {
        reply.code(400).send({ message: 'Perfil não encontrado' });
      }

      reply.code(200).send({ message: 'Perfil atualizado', profile });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Perfil não atualizado' });
    }
  }

  async deleteProfile(request, reply) {
    try {
      const { id } = request.params;

      const profile = await profileService.deleteProfile(id);

      if (!profile) {
        reply.code(400).send({ error: 'Perfil não localizado' });
      }

      reply.code(200).send({ message: 'Perfil deletado', profile });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Perfil não deletado' });
    }
  }
}

export default new ProfileController();
