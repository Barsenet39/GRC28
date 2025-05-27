import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  organization: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  tinNumber: String,
  businessType: String
});

export default mongoose.model('User', userSchema);