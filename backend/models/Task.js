const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    attachment: { type: String, required: false },
    assigned_to: {type: String, required:false}
});

module.exports = mongoose.model('task', TaskSchema);
