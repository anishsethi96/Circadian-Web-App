module.exports = (sequelize, Sequelize) => {
  const Saved_Rooms = sequelize.define("saved_room", {
    room_uid: {
      type: Sequelize.STRING
    },
    building_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    room_name: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    location: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    savedroom_type: {
      type: Sequelize.DECIMAL
    },
    measurement_angle: {
      type: Sequelize.DECIMAL
    },
    measurement_height: {
      type: Sequelize.DECIMAL
    },
    room_spd_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Saved_Rooms.removeAttribute('id');

  return Saved_Rooms;
};
