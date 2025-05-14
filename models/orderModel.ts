import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: {
            block: String || undefined,
            street: String || undefined,
            house: String || undefined,
            jaddah: String || undefined,
            floorApt: String || undefined
        },
        required: true,
        _id: false
    },
    phone: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "processing"
    },
    asignee_name: {
        type: String,
        default: ''
    },
    asignee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    date_delivered: { type: Date, default: null },
    date_created_gmt: { type: Date, required: true },
    date_modified_gmt: { type: Date, required: true },
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order