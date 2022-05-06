const mongoose = require("mongoose");
const subscriberSchema = require("../schemas/subscriber.schema");

// Ensure virtual fields are serialised.
subscriberSchema.set("toJSON", {
    virtuals: true
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;