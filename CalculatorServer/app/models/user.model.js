module.exports = (sequelize, Sequelize) => {
  const User_Info = sequelize.define("user_info", {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email_id: {
      type: Sequelize.STRING
    },
    company_name: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  User_Info.removeAttribute('id');

  return User_Info;
};
