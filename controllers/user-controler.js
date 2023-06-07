const { User } = require("../models/");

module.exports = class UserController {
  async getAll(request, response) {
    try {
      const databaseUsers = await User.findAll();
      return response.json(databaseUsers);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async create(request, response) {
    try {
      const user = await User.create({
        name: request.body.name,
        birth_date: request.body.birth_date,
        email: request.body.email,
        cpf: request.body.cpf,
      });
      return response.status(201).json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(request, response) {
    try {
      const user = await User.findByPk(request.params.id);

      if (!user) {
        return response.status(404).json({
          error: "Usuário não encontrado!",
        });
      }

      await User.destroy({
        where: {
          id: Number(request.params.id),
        },
      });

      return response.status(204).end();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async update(request, response) {
    try {

      let editSchema = {
        name: request.body.name,
        birth_date: request.body.birth_date,
        email: request.body.email,
        cpf: request.body.cpf,
      }

      const data = editSchema;
      const userId = Number(request.params.id);

      const updatedUser = await User.update(
        {
          ...data,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return response.json(updatedUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
};
