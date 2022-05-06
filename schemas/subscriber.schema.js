const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    /**
     * Subscrbier object schema.
     * For any subscriber, one or more phone numbers can be assigned.
     */
    name: {
        type: String,
        unique: true,
        required: [true, "is required"]
    },
    phone: [{
        type: Schema.Types.ObjectId,
        ref: "Phone"
    }]
    }, {collection: "subscribers"}
);

module.exports = subscriberSchema;