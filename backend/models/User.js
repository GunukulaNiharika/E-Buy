const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    // User Image
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  },
  contactNumber: { type: String },
  pofilePicture: { type: String },
},
{ timestamps: true }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
module.exports = mongoose.model("User", UserSchema);
  