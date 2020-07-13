module.exports = app => {
  const spddata = require("../controllers/spd_data.controller.js");

  var router = require("express").Router();

  // Create a new Data entry
  router.post("/", spddata.create);

  // Retrieve all SPD data by UID
  router.get("/:id", spddata.findAllbyUID);

  // Retrieve a single SPD with SPD_id
  router.get("/:id", spddata.findOne);

  // Update a SPD with id
  router.put("/:id", spddata.update);

  // Delete a SPD with id
  router.delete("/:id", spddata.delete);

  app.use('/api/spddata', router);
};
