import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  displayName: {
    type: String,
  },
});

const User = mongoose.model("user", userShema);

export default User;
