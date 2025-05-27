const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  services: [{ // 👈 add this
    type: String,
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Request || mongoose.model("Request", RequestSchema);