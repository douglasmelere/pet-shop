module.exports = (sequelize, Sequelize) => {
    const animal = sequelize.define("animal", {
      name: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      owner_name: {
        type: Sequelize.STRING,
      },
      breed: {
          type: Sequelize.STRING,
      },
      weight: {
          type: Sequelize.INTEGER,
      },
      is_vacinated: {
          type: Sequelize.STRING,
      }
    })
  
    return animal
  }