const mongoose = require("mongoose");
const User = require("./User");

const GRCRequestSchema = new mongoose.Schema(
  {
    requestType: {
      project: { type: Boolean, required: true, default: false },
      technicalSupport: { type: Boolean, required: true, default: false },
    },
    priority: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    relatedDocuments: [String],
    requestLetterDocuments: [String],

    approvalStatus: {
      DirectorGeneral: {
        approved: Boolean,
        comment: String,
        rejected: Boolean,
        rejectReason: String,
        pushedDate: Date,
      },
      DeputyDirector: {
        pushed: Boolean,
        comment: String,
        rejected: Boolean,
        rejectReason: String,
        pushedDate: Date,
      },
      DirectorateDirector1: {
        pushed: Boolean,
        comment: String,
        pushedDate: Date,
      },
      DirectorateDirector2: {
        pushed: Boolean,
        comment: String,
        pushedDate: Date,
      },
      DivisionHeadCSRM: {
        pend: Boolean,
        comment: String,
        pushedDate: Date,
        assignedExperts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert",
          },
        ],
        timestamp: { type: Date, default: null },
      },
      DivisionHead2: {
        pend: Boolean,
        comment: String,
        pushedDate: Date,
        assignedExperts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectManager",
          },
        ],
        timestamp: { type: Date, default: null },
      },
      DivisionHeadCSM: {
        pend: Boolean,
        comment: String,
        pushedDate: Date,
        assignedExperts: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expert",
          },
        ],
        timestamp: { type: Date, default: null },
      },
    },

    feedback: {
      comment: String,
    },
    reportDoc: [String],
    certDoc: [String],

    status: {
      type: String,
      default: "Pending DirectorGeneral Approval",
    },
    paymentStatus: {
      type: String,
      default: "Unpaid",
    },
    paymentDetails: {
      comment: String,
      transactionId: String,
    },
    receiptImage: [String],

    assignedDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GRCRequest", GRCRequestSchema);
