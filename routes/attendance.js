const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new attendance record
router.post('/', async (req, res) => {
  const attendance = new Attendance({
    staff: req.body.staffId,
    checkInDateTime: req.body.checkInDateTime,
    checkOutDateTime: req.body.checkOutDateTime,
    workLocation: req.body.workLocation,
    taskType: req.body.taskType,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskCompletionPercentage: req.body.taskCompletionPercentage,
    taskStatus: req.body.taskStatus,
    comments: req.body.comments,
    hoursAllocated: req.body.hoursAllocated
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD operations (GET by ID, Update by ID, Delete by ID) for attendance can be added similarly

module.exports = router;
