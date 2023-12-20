const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff'
  },
  checkInDateTime: Date,
  checkOutDateTime: Date,
  workLocation: {
    type: String,
    enum: ['On premises', 'Remotely']
  },
  taskType: {
    type: String,
    enum: ['Project', 'Administrative', 'Other']
  },
  taskName: String,
  taskDescription: String,
  taskCompletionPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  taskStatus: {
    type: String,
    enum: ['Cancelled', 'WIP', 'Completed']
  },
  comments: String,
  hoursAllocated: Number
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
