const { Animal } = require("../models/");

module.exports = class AnimalController {
  async getAll(request, response) {
    try {
      const databaseUsers = await Animal.findAll();
      return response.json(databaseUsers);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async create(request, response) {
    try {
      const animal = await Animal.create({
        name: request.body.name,
        age: request.body.age,
        owner_name: request.body.owner_name,
        breed: request.body.breed,
        weight: request.body.weight,
        is_vacinated: request.body.is_vacinated
      });
      return response.status(201).json(animal);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
  async delete(request, response) {
    
    const animal = await Animal.findByPk(request.params.id)

    if (!animal) {
      response.statusCode = 404
      response.json({
        error: "Animal não encontrado!",
      })
      return
    }

    await Animal.destroy({
      where: {
        id: Number(request.params.id),
      },
    })

    response.statusCode = 204
    response.end()
  }
};
