const mongoose = require("mongoose");
const phoneSchema = require("../schemas/phone.schema");

// Ensure virtual fields are serialised.
phoneSchema.set("toJSON", {
    virtuals: true
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;