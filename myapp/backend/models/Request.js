import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Technical Support', 'Project'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'Closed', 'Expired', 'Rejected'],
    default: 'Requested',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectOption: {
    type: String,
  },
  description: {
    type: String,
  },
  files: {
    letter: Buffer,
    project: Buffer,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Request', requestSchema);