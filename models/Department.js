const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: String,
  // Other fields as needed
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
