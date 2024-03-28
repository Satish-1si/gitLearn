const express = require("express");
const server = express();
const path = require("path");

server.use(express.static(path.join(__dirname,"staticFiles")));


server.listen(4321, () => {
    console.log("server loading ... 4321");
});
