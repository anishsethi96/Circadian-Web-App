module.exports = (sequelize, Sequelize) => {
  const SPDData = sequelize.define("spd_data", {
    spd_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_uid: {
      type: Sequelize.STRING
    },
    spd_name: {
      type: Sequelize.STRING // this has to be "unique"
      // make changes in postgres create statements.
    },
    spd_value: {
      type: Sequelize.JSON
    },
    lux_level: {
      type: Sequelize.DECIMAL
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  SPDData.removeAttribute('id');

  return SPDData;
};
