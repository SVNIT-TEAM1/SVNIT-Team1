const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    username : {
      type : String,
      require : true,
      unique : true
    },
    password : {
      type : String,
      require : true,
      unique : true
    }
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user", userSchema);

module.exports = User;