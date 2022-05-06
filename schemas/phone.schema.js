const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    /**
     * Phone object schema.
     * For any phone number exactly one subscriber can be assigned.
     */
    number: {
        type: String,
        unique: true,
        required: [true, "is required"]
    }}, 
    {collection: "phones"}
);

module.exports= phoneSchema;