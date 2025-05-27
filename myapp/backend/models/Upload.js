import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
 requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  url: String,
  type: String,
  status: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Upload', uploadSchema);