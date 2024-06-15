const mongoose = require("mongoose");
const Bcrypt=require("bcryptjs")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: function(msg) {
        return /^[a-z]*@gmail.com$/.test(msg);
      },
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function(msg) {
        return /^[a-z0-9]*$/.test(msg);
      },
      message: "Password does not match the server criteria"
    },
    select:false
  },
  conformPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        // This works only on save and create, not on update
        return value === this.password;
      },
      message: "Passwords do not match"
    }
  },
  photo: {
    type: String
  }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    // Check if the previous password field ,user enter password will same==>then next middle will call
   //Note :- 
  // 1. 'this' refers to the current document in the database
 //  2. 'isModified' is a Mongoose method to check if a field has been modified
//   3. 'password' refers to the user-entered password
  if (!this.isModified('password')) {
    return next();
  }

  try {//if the password field is new ==> It can encrped and store in Db
    // Hash the password
    const saltRounds = 10;
    this.password = await Bcrypt.hash(this.password, saltRounds);
    // Remove the confirmPassword field at the time DB-Store
    this.conformPassword= undefined;
    next();
  } catch (err) {
    next(err);
  }

})
 
// Add the comparePassword method to the schema
userSchema.methods.comparePasswordInDb = async function(userPassword,DBpassword) {
  return await Bcrypt.compare(userPassword, DBpassword);
};

const User = mongoose.model("UserAuthtication", userSchema);

module.exports = User;
