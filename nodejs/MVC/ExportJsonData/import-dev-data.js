//server import 
const { MoviesModel } = require("../Model/MoviesModel.js");
const fs=require("fs")
const movies=JSON.parse(fs.readFileSync("./Movies.json","utf-8"))


//import the dotenv pakage
const dotenv=require("dotenv");
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

const DeleteMovies=async()=>{
    try{
            await MoviesModel.deleteMany();
            console.log("Data Delete sussessfully !!!")
    }
    catch(err){
        console.log(err.message)

    }
    process.exit()

}
const ImportMovies=async()=>{
    try{
            await MoviesModel.create(movies);
            console.log("movies insert sussessfully !!!")
    }
    catch(err){
        console.log(err.message)

    }
    process.exit()
}
if(process.argv[2]==="--Import"){
    ImportMovies()
}
else if(process.argv[2]==="--Delete"){
    DeleteMovies()
}

