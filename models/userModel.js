const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide our email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."]
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 8,
    // so it will not show up in GET requests
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      // only works on create and save
      validator: function(e) {
        return e === this.password
      },
      message: "Passwords are not the same."
    }
  }
})

// encrypt psw before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  // delete passwordConfirm
  this.passwordConfirm = undefined
  next()
})

// instance methods
userSchema.methods.correctPassword = async function(inputPsw, actualPsw) {
  return await bcrypt.compare(inputPsw, actualPsw)
}

const User = mongoose.model("User", userSchema)

module.exports = User
