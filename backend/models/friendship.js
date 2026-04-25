import mongoose from "mongoose";

const friendShipSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
friendShipSchema.index({ requester: 1, recipient: 1 }, { unique: true });

export default mongoose.model("Friendship", friendShipSchema);
