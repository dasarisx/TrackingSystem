import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    
    // Reference to a user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to a vessel
    vesselId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vessel",
      required: true,
    },

    // Issue category (string)
    category: {
      type: String,
      required: [true, "Please specify the issue category"],
    },

    // Description of the issue
    description: {
      type: String,
      default: "",
    },

    // Priority: Low / Medium / High
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: [true, "Please specify the priority"],
    },

    // Status: Open / Resolved
    status: {
      type: String,
      enum: ["Open", "Resolved"],
      default: "Open",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

export const Issue = mongoose.model("Issue", issueSchema);