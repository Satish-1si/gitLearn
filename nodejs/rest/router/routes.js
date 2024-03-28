
const { GetBricks, postBricks, putBricks, DeleteBricks } = require("../controllers/bricks.js");
const express=require("express");
const server=express();
const RouterMiddleware=express.Router();
const env=require("dotenv");
env.config({path:"../config.env"})
RouterMiddleware.route("/Bricks/:productId?").get(GetBricks);
RouterMiddleware.route("/Bricks").post(postBricks);
RouterMiddleware.route("/Bricks/:index").put(putBricks).delete(DeleteBricks);
exports.server=server;
exports.Router=RouterMiddleware;


