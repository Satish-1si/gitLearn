const {CabelModel}=require("../model/Cabel.js")
const Express=require("express")
const controllers=require("../controllers/AllControllers.js")
const Router=Express.Router();
Router.route("/CreateMovies").post((req,res)=> controllers?.CreateOneToMany(req,res,CabelModel))
Router.route("/findMovies").get((req,res)=> controllers?.Find(req,res,CabelModel))
module.exports=Router;