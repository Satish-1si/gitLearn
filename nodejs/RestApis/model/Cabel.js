const mongoose = require("mongoose");


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



   

// Create the cabel model ==>mongoose.model("collection_name", MoviesSchema);
const collection="MoviesApi"
module.exports.CabelModel = mongoose.model(MoviesSchema, CabelSchema);

