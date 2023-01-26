import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
