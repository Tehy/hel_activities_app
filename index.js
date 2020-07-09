const config = require("./utils/config.js");
//require("express-async-errors");
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log("App listening on port " + config.PORT);
});
