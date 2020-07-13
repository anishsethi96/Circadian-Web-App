const db = require("../models");
const Saved_Rooms = db.savedroom;
const Op = db.Sequelize.Op;

// Create and Save a room
exports.create = (req, res) => {
  // Validate request
  if (!req.body.room_uid) {
    res.status(400).send({
      message: "Room UID can not be empty!"
    });
    return;
  }

  // Create a room object
  const roomObj = {
    room_uid: req.body.room_uid,
    building_name: req.body.building_name,
    room_name: req.body.room_name,
    location: req.body.location,
    savedroom_type: req.body.savedroom_type,
    measurement_angle: req.body.measurement_angle,
    measurement_height: req.body.measurement_height,
    room_spd_id: req.body.room_spd_id
  };

  // Save room in database
  Saved_Rooms.create(roomObj)
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

  Saved_Rooms.findAll({ where: condition })
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

  Saved_Rooms.findByPk(id)
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
