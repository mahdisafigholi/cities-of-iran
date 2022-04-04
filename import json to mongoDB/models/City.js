const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    sub: { type: String }
}, {
    timestamps: false,
    versionKey: false
});

module.exports = mongoose.model("city", schema);
