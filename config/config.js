const configuration = require("../utils/configuration")

const config = configuration()

module.exports = {
  development: {
    ...config.database,
  }
}