const Express=require("express");
const Router=Express.Router();
const controller=require("../controllers/AllControllers")

//Movies
Router.route("/").post((req,res,next)=>controller?.createMovies(req,res,next))//crete({}||[{},{}])
                 .get((req, res, next) => controller.ProtectRoutes(req, res, next), 
                      (req, res, next) => controller.GetAllMovies(req, res, next)
                     );//find

//Movies operations ==> By Id
Router.route("/:id").get((req,res,next)=>controller?.GetMoviesById(req,res,next))//findById(id)
                    .patch((req,res,next)=>controller?.UpdateMoviesById(req,res,next))//findByIdAndUpdate(id)
                    .delete((req,res,next)=>controller?.DeleteMoviesById(req,res,next))//findByIdAndDelete(id)

//Movies operations ==> By filters

module.exports=Router