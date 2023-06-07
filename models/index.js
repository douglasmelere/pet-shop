const Sequelize = require("sequelize")
const User = require("./user.model")
const Animal = require("./animal.model")
const Service = require("./service.model")
const ServiceType = require("./service-type.model")
const configuration = require("../utils/configuration")

const config = configuration()
const sequelize = new Sequelize(config.database)

const database = {
  Sequelize,
  sequelize,
  User: User(sequelize, Sequelize),
  Animal: Animal(sequelize, Sequelize),
  Service: Service(sequelize, Sequelize),
  ServiceType: ServiceType(sequelize, Sequelize),
}

module.exports = database