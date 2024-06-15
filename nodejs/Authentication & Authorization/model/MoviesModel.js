const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {   
        unique:true,    
        type: String,
        required: [true, "Name is required"],
        maxlength: [40, "Maximum string length is 40 characters"],
        minlength: [3, "Minimum string length is 3 characters"],
        validate: {
            validator: (value) => /^\D{3,40}$/.test(value),
            message: "Validation error: Name must be between 3 to 40 non-digit characters"
        }
    },
    duration: {       
        type: Number,
        default: 1,
        min: [1, "Duration must be at least 1 hour"],
        max: [4, "Duration cannot exceed 4 hours"],
        enum: {
            values: [1, 2, 3, 4],
            message: "Duration must be between 1 to 4 hours"
        }
    },
    description: {       
        type: String,
        default: ""
    },
    ratings: {       
        type: Number,
        required: [true, "Ratings are required"],
        default: 1,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"],
        enum: {
            values: [1, 2, 3, 4, 5],
            message: "Rating must be between 1 to 5"
        }
    },
    totalRating: {       
        type: Number,
        default: 1,
        min: [1, "Total rating must be at least 1"],
        max: [5, "Total rating cannot exceed 5"],
        enum: {
            values: [1, 2, 3, 4, 5],
            message: "Total rating must be between 1 to 5"
        }
    },
    releaseYear: {       
        type: String,
        default: "",
        validate: {
            validator: (value) => {
                const currentYear = new Date().getFullYear();
                return /^\d{4}$/.test(value) && parseInt(value) <= currentYear;
            },
            message: "Please post a year less than or equal to the current year"
        }
    },
    releaseDate: {       
        type: Date,
        required: [true, "Release date is required"],
        default: Date.now,
        validate: {
            validator: (value) => {
                return /^\d{4}-\d{2}-\d{2}$/.test(value.toISOString().split('T')[0]);
            },
            message: "Please post a proper date format: YYYY-MM-DD"
        }
    },
    createdAt: {       
        type: Date,
        required: [true, "Creation date is required"],
        default: Date.now,
        validate: {
            validator: (value) => {
                return /^\d{4}-\d{2}-\d{2}$/.test(value.toISOString().split('T')[0]);
            },
            message: "Please post a proper date format: YYYY-MM-DD"
        }
    },
    DirectorName: {       
        type: String,
        required: [true, "Director name is required"],
        maxlength: [40, "Maximum string length is 40 characters"],
        minlength: [3, "Minimum string length is 3 characters"],
        validate: {
            validator: (value) => /^\D{3,40}$/.test(value),
            message: "Validation error: Director name must be between 3 to 40 non-digit characters"
        }
    },
    ActorName: {       
        type: String,
        required: [true, "Actor name is required"],
        maxlength: [40, "Maximum string length is 40 characters"],
        minlength: [3, "Minimum string length is 3 characters"],
        validate: {
            validator: (value) => /^\D{3,40}$/.test(value),
            message: "Validation error: Actor name must be between 3 to 40 non-digit characters"
        }
    },
    MovieName: {
        type: String,
        required: [true, "Movie name is required"],
        unique: true,
        trim: true,
        maxlength: [40, "Maximum string length is 40 characters"],
        minlength: [3, "Minimum string length is 3 characters"],
        validate: {
            validator: (value) => /^\D{3,40}$/.test(value),
            message: "Validation error: Movie name must be between 3 to 40 non-digit characters"
        }
    },
    price: {       
        type: Number,
        required: [true, "Price is required"],
        min: [50, "Movie cost must be greater than or equal to 50"]
    }
});

const collection = "Movies_Api";
module.exports.MoviesModelApi = mongoose.model(collection, userSchema);
