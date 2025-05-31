import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  requestId: String,
  companyName: String,
  date: String,
  type: String,
  status: String,
  userId: String,
  services: [String],
  filePaths: [String], // If you save paths to uploaded files
});
export default mongoose.model('Upload', uploadSchema);