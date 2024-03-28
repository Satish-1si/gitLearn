const express = require("express");
const { getAllMovies,getHighestRatedMovies,views, getMovie, createMovie, deleteMovie, updateMovie } = require("../Controller/MoviesController.js");
const {GetAllMovies}=require("../Controller/Curd.js");
console.log("routes")
const Router = express.Router();

Router.route("/Topper")
      .get(views);
console.log("................")
Router.route("/")
    // .get(getHighestRatedMovies,getAllMovies)
    .get(GetAllMovies)
    .post(createMovie);

Router.route("/:id")
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie);

module.exports = { Router, express };

// 1.middelware<===Routes <===controllers <===model <===server
//                                                         ==>.dotenv + moogose connection 
  
