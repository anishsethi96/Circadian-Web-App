module.exports = app => {
  const rooms = require("../controllers/rooms.controller.js");

  var router = require("express").Router();

  // Create a room object
  router.post("/", rooms.create);

  // Retrieve all room information
  router.get("/", rooms.findAll);

  // Retrieve a room infomation with room_type_id
  router.get("/:id", rooms.findOne);

  app.use('/api/rooms', router);
};
