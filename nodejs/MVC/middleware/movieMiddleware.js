console.log("middleware")
const {express,Router}=require("../Router/MoviesRouter");
const server=express();
const morgan=require("morgan")
const path=require("path")
const ejs=require("ejs");
//set the Ejs in server...
server.set('view engine', 'ejs');
// Specify the directory for EJS files...
server.set('views', path.join(__dirname , '../staticFiles'));
server.use(express.static(path.join(__dirname,"../public")))
//convert binary Data into json format and add in req object...
server.use(express.json());
//check the client details...
server.use(morgan("dev"));
//handle the Routes using middleware...
server.use("/api/v1/movies",Router);
exports.server=server;

//   1st        2nd              3rd            4th               5th     ===>run
// server(5)<==middelware(4)<===Routes(3) <===controllers(2) <===model(1) ===>use
                                                         

// server ==>.dotenv + moogose connection 
  