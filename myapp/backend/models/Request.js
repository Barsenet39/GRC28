import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: [true, 'Request ID is required'],
    trim: true,
    unique: true,
  },
  userId: {  // Added userId to track which user made the request
    type: String,
    required: [true, 'User ID is required'],
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,  // Changed to Date type for better handling
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'Rejected', 'Deputy_Rejected'], // Removed trailing dot
    default: 'Requested',
  },
    businessType: {
    type: String,
    trim: true,
    default: '',
  },
  otherBusinessType: {
    type: String,
    trim: true,
    default: '',
  },
  companyPhone: {
    type: String, // Changed to String for consistency
    trim: true,           },
  companyEmail: {   
    type: String,
    trim: true,
  },
  companyAddress: {
    type: String, 
    trim: true,
  
 },
  firstName: {
    type: String,     
    trim: true,
    
  },
  lastName: {     
    type: String,
    trim: true,
   
  },
  services: [
    {
      mainTitle: { type: String, trim: true, required: true },
      category: { type: String, trim: true, required: true },
      subCategory: { type: String, trim: true, required: true },
      items: [
        {
          name: { type: String, trim: true, required: true },
          cost: { type: String, trim: true, required: true },
        },
      ],
    },
  ],
  files: {
    letterFile: {
      path: { type: String, required: true },
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
    },
    projectFile: {
      path: { type: String, required: true },
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
    },
  },
  priority: {
    type: String,
    enum: ['Assurance', 'BDPD', 'Both', null],
    default: null,
  },
  comments: {
    type: String,
    trim: true,
    default: '',
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
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
