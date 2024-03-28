const express = require("express");
const {json}=require("express")
const server = express();
const port = 3251;
//Route methods :-
const {GetPots  ,}= require("./pots.js")
const {GetBricks,postBricks,putBricks,DeleteBricks} = require("./bricks.js")
const {GetCrops ,}=require("./crops.js")
const {Getsteel ,}= require("./steel.js")

//add the client send Body in request object
server.use(json());

// Use different URL patterns for the routes
server.get("/api/v1/pots/:productId", GetPots);
server.get("/api/v1/Bricks/:productId", GetBricks);
server.get("/api/v1/crops/:productId", GetCrops);
server.get("/api/v1/stealpots/:productId", Getsteel);

server.post("/api/v1/Bricks",postBricks)
server.route("/api/v1/Bricks/:index").put(putBricks)
                                     .delete(DeleteBricks)
//server loading
server.listen(port, () => {
	console.log(`Server loading...${port}`);
});
