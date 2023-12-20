const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new department
router.post('/', async (req, res) => {
  const department = new Department({
    name: req.body.name // Assuming the request body contains 'name' field for the department
  });

  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD operations (GET by ID, Update by ID, Delete by ID) for departments can be added similarly

module.exports = router;
