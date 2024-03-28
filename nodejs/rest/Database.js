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

// Define the schema for the student collection
const StudentSchema = new mongoose.Schema({
    courses: {
        type: String,
        required: [true, "Course name field is required !!!"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Name field is required !!!"]
    },
    age: {
        type: Number,
        required: [true, "Age field is required !!!"]
    },
    gender: {
        type: String, // Assuming gender is a string
        required: [true, "Gender field is required !!!"]
    },
    score: {
        type: Number,
        default: 0
    }
});

// Create the student model
const StudentModel = mongoose.model("Student", StudentSchema);

const InsertData=new StudentModel({
    courses:"Mech",
    name:"sai",
    age:26,
    gender:"Male",
    Score:10
})
InsertData.save()
          .then((arg)=>console.log(arg))
          .catch((arg)=>console.log("schema Error Occur !!!"))