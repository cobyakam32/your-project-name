const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
