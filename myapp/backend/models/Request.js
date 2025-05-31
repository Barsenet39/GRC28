import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  userId: String,
  requestId: { type: String, unique: true },
  companyName: String,
  date: String,
  type: String,
  status: String,
  services: Array,
  file: {
    data: Buffer,
    filename: String,
    contentType: String,
  },
});

export default mongoose.model("Request", requestSchema);
