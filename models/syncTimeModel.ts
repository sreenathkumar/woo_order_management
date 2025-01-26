import mongoose from "mongoose";

const SyncSchema = new mongoose.Schema({
    doc: {
        type: String,
        required: true
    },
    lastSyncedAt: {
        type: Date,
        default: Date.now
    }
})

const SyncTime = mongoose.models.SyncTime || mongoose.model("SyncTime", SyncSchema);

export default SyncTime