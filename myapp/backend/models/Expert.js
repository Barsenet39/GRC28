const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, default: "none" },
    verification: { type: Boolean, default: false },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    phoneVerification: { type: Boolean, default: false },
    userType: {
      type: String,
      required: true,
      enum: [
        "Admin",
        "Customer",
        "DirectorGeneral",
        "DeputyDirector",
        "DirectorateDirector1",
        "DirectorateDirector2",
        "DivisionHeadCSM",
        "DivisionHeadCSRM",
        "DivisionHead2",
        "Expert",
        "TechnicalManager",
        "ProjectManager"
      ],
    },
    profile: {
      type: String,
      required: true,
      default:
        "https://d326fntlu7tb1e.cloudfront.net/uploads/bdec9d7d-0544-4fc4-823d-3b898f6dbbbf-vinci_03.jpeg",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddressModel",
    },
    failedAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", ExpertSchema);
