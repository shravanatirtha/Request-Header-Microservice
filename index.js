const express = require("express");
const app = express();
const requestIp = require("request-ip");
const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.listen("2000", function () {
  console.log("node server at http://localhost:2000");
});
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var middleware = function (req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  next();
};
app.use(requestIp.mw());
app.get("/api/whoami", (req, res) => {
  var ipaddress = req.clientIp;
  var language = req.acceptsLanguages();
  var software = req.get("User-Agent");
  res.json({
    ipaddress: ipaddress,
    language: language[0],
    software: software,
  });
});
