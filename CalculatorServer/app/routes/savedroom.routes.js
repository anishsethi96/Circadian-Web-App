module.exports = app => {
  const rooms = require("../controllers/savedroom.controller.js");

  var router = require("express").Router();

  // Create a saved_room object
  router.post("/", rooms.create);

  // Retrieve all saved_room information
  router.get("/", rooms.findAll);

  // Retrieve a room infomation with room_type_id
  router.get("/:id", rooms.findOne);

  app.use('/api/savedroom', router);
};
