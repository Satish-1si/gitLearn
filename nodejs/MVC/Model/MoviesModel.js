
// 1.middelware<===Routes <===controllers <===model <===server
//                                                         ==>.dotenv + moogose connection 
  
const mongoose = require("mongoose");
console.log("Model")
// Define the schema for the student collection
const MoviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required !!!"],
        unique: true
    },
    duration: {
        type: Number,
        required: [true, "Duration field is required !!!"]
    },
    description: {
        type: String,
    },
    ratings: {
        type: Number,
        default: 1.0
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, "Released year is required field"]
    },
    releaseDate: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    genres: {
        type: [String],
        required: [true, "Genres is required field"]
    },
    directors: {
        type: [String],
        required: [true, "Directors is required field"]
    },
    actors: {
        type: [String],
        required: [true, "Actors is required field"]
    },
    coverImage: {
        type: String,
        required: [true, "Cover image is required field"]
    },
    price: {
        type: String,
        required: [true, "Price is required field"]
    }
    
});


// Create the student model ==>mongoose.model("collection_name", MoviesSchema);
const collection="cinima"
const MoviesModel = mongoose.model(collection, MoviesSchema);

exports.MoviesModel=MoviesModel;