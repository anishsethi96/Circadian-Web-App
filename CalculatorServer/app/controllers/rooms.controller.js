const db = require("../models");
const Rooms = db.rooms;
const Op = db.Sequelize.Op;

// Create and Save a room
exports.create = (req, res) => {
  // Validate request
  if (!req.body.standard_name) {
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }

  // Create a room object
  const roomObj = {
    room_type_id: req.body.room_type_id,
    standard_name: req.body.standard_name,
    application_type: req.body.application_type,
    lux_level_min: req.body.lux_level_min,
    lux_level_nom: req.body.lux_level_nom,
    lux_level_max: req.body.lux_level_max
  };

  // Save room in database
  Rooms.create(roomObj)
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

// Retrieve all room infomation.
exports.findAll = (req, res) => {
  const title = req.query.room_type_id;
  var condition = title ? { room_type_id: { [Op.iLike]: `%${title}%` } } : null;

  Rooms.findAll({ where: condition })
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

// Find a room by room_type_id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Rooms.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Users with UID=" + id
      });
    });
};

// Delete a room with the specified room_type_id in the request
exports.delete = (req, res) => {
};
