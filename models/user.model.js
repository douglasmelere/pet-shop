module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
    },
    cpf: {
      type: Sequelize.STRING,
    },
    birth_date: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  })

  return user
}