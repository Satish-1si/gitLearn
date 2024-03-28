//server import 
const {server}=require("../middleware/movieMiddleware")

//import the dotenv pakage:-
const dotenv=require("dotenv");//node module
dotenv.config({path:"../config.env"})


//import moongose package
const mongoose = require("mongoose");

// Ensure that the connection string is correctly set in your environment variables
const connectionStr = process.env.Connection_Str;

// Connect to MongoDB using Mongoose
mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Connection to MongoDB failed:", error.message);
    });
console.log("server")
let serverPort;
if(process.env.Node_Environment==="develeopment"){
    serverPort=process.env.PORT
}
let port=serverPort || 3357;
server.listen(port,()=>{
    console.log(`server loading at : ${port}`)
})


//   1st             2nd              3rd            4th               5th         ===>excute
// server(1)    <== middelware(2)<===Routes(3)   <===controllers(4) <===model(5) 
//[2nd-import]  <== [3rd-import] <===[4th-import]<===[ 5th-import]                 ===>imports
                                                         
//Note:- server ==>.dotenv + moogose connection


//middleware--> model ---> controoler --->


