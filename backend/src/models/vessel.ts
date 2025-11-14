import mongoose from "mongoose";

const vesselSchema = new mongoose.Schema(
  {
    // Vessel name
    name: {
      type: String,
      required: [true, "Please enter vessel name"],
    },

    // IMO number
    imo: {
      type: String,
      required: [true, "Please enter vessel IMO number"],
      unique: true,
    },

    // Flag of the vessel
    flag: {
      type: String,
      required: [true, "Please enter vessel flag"],
    },

    // Type (Cargo, Tanker, etc.)
    type: {
      type: String,
      enum: ["Cargo", "Tanker"],
      default: "Cargo",
    },

    // Status
    status: {
      type: String,
      enum: ["Active", "Maintenance"],
      default: "Active",
    },

    // Last inspection date
    lastInspectionDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Vessel = mongoose.model("Vessel", vesselSchema);
export default Vessel;
