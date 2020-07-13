const db = require("../models");
const SPDData = db.spddata;
const Op = db.Sequelize.Op;

// Create and Save new SPD_Data
exports.create = (req, res) => {
  // Validate request
  if (!req.body.user_uid) {
    res.status(400).send({
      message: "user_uid can not be empty!"``
    });
    return;
  }

  // Create SPD_Data Object
  const spdObj = {
    spd_id: req.body.spd_id,
    user_uid: req.body.user_uid,
    spd_name: req.body.spd_name,
    spd_value: req.body.spd_value,
    lux_level: req.body.lux_level,
  };

  // Save SPDData in the database
  SPDData.create(spdObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating SPD_Data."
      });
    });
};

// Retrieve all SPDData from the database.
exports.findAllbyUID = (req, res) => {
  const title = req.params.id;
  //console.log(req.params.id);

  SPDData.findAll({
    where: {
      user_uid: {
        [Op.eq]: title
        }
      }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SPD_Data."
      });
    });
};

// Find a single SPD_Data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SPDData.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving SPD_Data with id = " + id
      });
    });
};

// Update a SPD_Data by the id in the request
exports.update = (req, res) => {
};

// Delete a SPD_Data with the specified id in the request
exports.delete = (req, res) => {
};
