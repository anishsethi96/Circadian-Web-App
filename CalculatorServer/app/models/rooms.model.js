module.exports = (sequelize, Sequelize) => {
  const Rooms = sequelize.define("rooms", {
    room_type_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    standard_name: {
      type: Sequelize.STRING
    },
    application_type: {
      type: Sequelize.STRING
    },
    lux_level_min: {
      type: Sequelize.DECIMAL
    },
    lux_level_nom: {
      type: Sequelize.DECIMAL
    },
    lux_level_max: {
      type: Sequelize.DECIMAL
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Rooms.removeAttribute('id');

  return Rooms;
};
