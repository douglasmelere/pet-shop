module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable("animals", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("animals")
    },
  }