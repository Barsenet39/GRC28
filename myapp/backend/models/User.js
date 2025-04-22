import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  organization: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  tinNumber: String,
  businessType: String,
});

const User = mongoose.model('User', userSchema);

export default User; // ✅ This is the important line
