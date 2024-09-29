const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  dueDate: { type: Date, required: true },
  listingDate: { type: Date, required: true },
  sector: [{ type: String, required: true }],
  techSkills: [{ type: String }],
  coordinator: { type: String, required: true },
  attachment: [{ type: String, required:false}],
  task_id: [{type: String, required:true}]
});

module.exports = mongoose.model('proposal', proposalSchema);
