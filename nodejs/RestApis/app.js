const express=require("express");
const server=express();
const Body_parser=require("body-parser")
const Router=require("./Routers/product.js")
const morgon=require("morgan")
const ENV=require("dotenv")
const mongoose = require("mongoose");
const {CustomErrorClass}=require("./utils/CustomError.js")
//configure the our local env file in Dotenv File 
ENV.config({path:"./config.env"})
//hit the url tht time log the client information in server:-
server.use(morgon("dev"))
//set the ejs files in server 
server.set("view engine","ejs")
//add the json parser middleware ==>parse the json data
server.use(express.json())
//add the body-parser middlewrae ==>parse the url encoded data
server.use(Body_parser.urlencoded({extended:true}))
//send the static files in client :-access entire application modules,files,Directly access client etc...
server.use(express.static("./public"))
//Handled the Routes using Express Router :-
server.use("/api/v1",Router)
//Handle any url in globally :- 
server.use("*",(req,res,next)=>{
      const Error=new CustomErrorClass(`cant find ${req.originalUrl} on this server !!!!`,404);//throw the error
    //   Error.status="fail";
    //   Error.statusCode=404;
      next(Error)//send the error in next middleware 
})
//Handle the Global Errors:- 
server.use((error,req,res,next)=>{
    error.statusCode=error.statusCode||404
    error.status=error.status|| "error"
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message
    })
})
// Ensure that the connection string is correctly set in your environment variables
const connectionStr = process.env.Db_Connection_Url;

// Connect to MongoDB using Mongoose
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Connection to MongoDB failed:", error.message);
    });


let port;
if(process.env.NODE_ENV==="Development"){
      port=process.env.PORT
}
server.listen(port,()=>console.log(`server loading at ${port}`))