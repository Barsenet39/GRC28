import mongoose from 'mongoose';

const decisionSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: [true, 'Request ID is required'],
    trim: true,
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Accepted', 'Rejected','Deputy_Rejected.'],
  },
  priority: {
    type: String,
    enum: ['Assurance', 'BDPD', 'Both', null],
    default: null,
  },
  comments: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  prioritydd: {
    type: String,
    enum: ['high', 'medium', 'low', null],
    default: null,
  },
  commentsdd: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Decision = mongoose.model('Decision', decisionSchema);

export default Decision;