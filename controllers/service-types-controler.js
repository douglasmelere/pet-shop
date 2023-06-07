const { ServiceType } = require("../models/");

module.exports = class ServiceTypeController {
  async getAll(request, response) {
    try {
      const databaseUsers = await ServiceType.findAll();
      return response.json(databaseUsers);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  async create(request, response) {
    try {
      const serviceType = await ServiceType.create({
        name: request.body.name,
        price: request.body.price,
        duration: request.body.duration,
      });
      return response.status(201).json(serviceType);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
  async delete(request, response) {
    
    const serviceType = await ServiceType.findByPk(request.params.id)

    if (!serviceType) {
      response.statusCode = 404
      response.json({
        error: "Serviço não encontrado!",
      })
      return
    }

    await ServiceType.destroy({
      where: {
        id: Number(request.params.id),
      },
    })

    response.statusCode = 204
    response.end()
  }
};
