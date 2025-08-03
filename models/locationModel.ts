import mongoose from "mongoose";

const CoordinatesSchema = new mongoose.Schema({
    lon: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
}, { _id: false });

const LocationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        unique: true,
    },
    blocks: {
        type: Map,
        of: CoordinatesSchema,
        required: true,
    }
});

const Location = mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Location;