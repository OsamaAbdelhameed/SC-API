const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    desc: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    arrivalDate: { type: String, required: true }
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = { Request };