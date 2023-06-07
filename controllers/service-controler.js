const { Service } = require("../models/");

module.exports = class ServiceController {
  async getAll(request, response) {
    try {
      const databaseUsers = await Service.findAll();
      return response.json(databaseUsers);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async create(request, response) {
    try {
      const service = await Service.create({
        service_type: request.body.service_type,
        scheduled_date: request.body.scheduled_date,
        animal: request.body.animal,
      });
      return response.status(201).json(service);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
  async delete(request, response) {
    
    const service = await Service.findByPk(request.params.id)

    if (!service) {
      response.statusCode = 404
      response.json({
        error: "Serviço não encontrado!",
      })
      return
    }

    await Service.destroy({
      where: {
        id: Number(request.params.id),
      },
    })

    response.statusCode = 204
    response.end()
  }
};
