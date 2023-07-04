const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const prioritySchema = new Schema({
    priority: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Priority = model('Priority', prioritySchema);
module.exports = Priority;