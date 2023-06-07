module.exports = (sequelize, Sequelize) => {
    const serviceType = sequelize.define("service-type", {
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
    })
  
    return serviceType
  }