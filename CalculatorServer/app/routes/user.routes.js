module.exports = app => {
  const user_info = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a user login object
  router.post("/", user_info.create);

  // Retrieve all user information
  router.get("/", user_info.findAll);

  // Retrieve a single user's infomation with UID
  router.get("/:id", user_info.findOne);

  // Delete a User login with UID
  router.delete("/:id", user_info.delete);

  app.use('/api/user_info', router);
};
