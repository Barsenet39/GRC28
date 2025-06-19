// import mongoose from 'mongoose';

// const serviceItemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   cost: { type: String, required: true },
// }, { _id: false });

// const serviceSchema = new mongoose.Schema({
//   mainTitle: { type: String, required: true },
//   category: { type: String, required: true, trim: true },
//   subCategory: { type: String, required: true, trim: true },
//   items: { type: [serviceItemSchema], required: true },
// }, { _id: false });

// const fileSchema = new mongoose.Schema({
//   path: { type: String, required: true },
//   filename: { type: String, required: true },
//   contentType: { type: String, required: true },
// }, { _id: false });

// const requestSchema = new mongoose.Schema({
//   requestId: { type: String, required: true, unique: true, trim: true },
//   userId: { type: String, required: true },  // Store string userId (UUID)
//   companyName: { type: String, required: true, trim: true },
//   companyPhone: { type: String, trim: true },
//   companyEmail: { type: String, trim: true },
//   type: { type: String, required: true, enum: ['Project', 'Technical Support'] },
//   services: { type: [serviceSchema], required: true },
//   files: {
//     letterFile: { type: fileSchema, required: true },
//     projectFile: { type: fileSchema, required: true },
//   },
//   date: { type: Date, default: Date.now },
//   status: { type: String, enum: ['Requested', 'Accepted', 'Rejected'], default: 'Requested' },
//   businessType: { type: String, trim: true },
//   otherBusinessType: { type: String, trim: true },
// }, { timestamps: true });

// requestSchema.index({ requestId: 1 }, { unique: true });

// const Request = mongoose.model('Request', requestSchema);
// export default Request;
