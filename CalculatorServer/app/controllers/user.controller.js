const db = require("../models");
const User_Info = db.user_info;
const Op = db.Sequelize.Op;

// Create and Save new user infomation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }

  // Create a user login object
  const userObj = {
    uid: req.body.uid,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    company_name: req.body.company_name
  };

  // Save login details in the database
  User_Info.create(userObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all user information from the database. (For admin use)
exports.findAll = (req, res) => {
  const title = req.query.uid;
  var condition = title ? { uid: { [Op.iLike]: `%${title}%` } } : null;

  User_Info.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User infomation."
      });
    });
};

// Find a single user with an UID.
exports.findOne = (req, res) => {
  const id = req.params.id;

  User_Info.findByPk(id)
    .then(data => {
      res.send(data.password);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Users with UID=" + id
      });
    });
};

// Update (Forget password..) a User with the specified UID in the request
exports.delete = (req, res) => {
};
