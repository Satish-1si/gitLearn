const Express=require("express");
const authRouter=Express.Router();
const authController=require("../controllers/AllControllers")
authRouter.route("/signup").post((req,res,next)=>authController?.Signup(req,res,next))
                           .get((req,res,next)=>authController?.GetAllSignupDetails(req,res,next))
                           
authRouter.route("/login").post((req,res,next)=>authController?.Login(req,res,next))
module.exports=authRouter