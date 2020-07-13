const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_info = require("./user.model.js")(sequelize, Sequelize);
db.spddata = require("./spddata.model.js")(sequelize, Sequelize);
db.rooms = require("./rooms.model.js")(sequelize, Sequelize);
db.savedroom = require("./savedroom.model.js")(sequelize, Sequelize);


module.exports = db;
