const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "Circadian Web Calculator" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/spddata.routes")(app);
require("./app/routes/rooms.routes")(app);
require("./app/routes/savedroom.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
