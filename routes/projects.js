const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project({
    name: req.body.name, // Assuming the request body contains 'name' field for the project
    department: req.body.departmentId // Assuming the request body contains 'departmentId' field for the project
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Other CRUD operations (GET by ID, Update by ID, Delete by ID) for projects can be added similarly

module.exports = router;
