import mongoose from "mongoose";

const postShema = mongoose.Schema({
  firstName: String,
  task: String,
  description: String,
  priority: String,
  photo: String,
  is_completed: Boolean,
});

const PostMessage = mongoose.model("PostMessage", postShema);

export default PostMessage;
