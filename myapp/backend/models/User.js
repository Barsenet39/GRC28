import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   userId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  organization: {
    type: String,
    trim: true,
    required: function () {
      // Required only if role is 'customer'
      return this.role === 'customer';
    }
  },

  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: {
    type: String,
    trim: true,
    required: function () {
      return this.role === 'customer';
    }
  },

  password: { type: String, required: true },

  tinNumber: {
    type: String,
    required: function () {
      return this.role === 'customer';
    }
  },

  businessType: {
    type: String,
    required: function () {
      return this.role === 'customer';
    }
  },

  otherBusinessType: { type: String, default: '', trim: true },

role: {
  type: String,
  enum: [
    'customer',
    'Director_General',
    'Deputy_Director',
    'Directorate_Director1',
    'Directorate_Director2',
    'Division_Head_CSM',
    'Division_Head_CSRM',
    'Division_Head2',
    'Expert',
    'Technical_Manager',
    'Project_Manager',
  ],
  default: 'customer',
},
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
