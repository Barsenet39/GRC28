import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  requestId: { type: String, unique: true, required: true },
  companyName: { type: String, required: true },
  date: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  services: { type: Array, required: true },
  files: {
    letterFile: {
      data: Buffer,
      filename: String,
      contentType: String,
    },
    projectFile: {
      data: Buffer,
      filename: String,
      contentType: String,
    },
  },
});


export default mongoose.model('Request', requestSchema);
