const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Attendance')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// Include routes
const departmentsRouter = require('./routes/departments');
const projectsRouter = require('./routes/projects');
const staffRouter = require('./routes/staff');
const attendanceRouter = require('./routes/attendance');
const protectedRoutes = require('./routes/protectedRoutes'); // Import the protected routes


// Use the routes in the Express app
app.use('/Department', departmentsRouter);
app.use('/Project', projectsRouter);
app.use('/Staff', staffRouter);
app.use('/Attendance', attendanceRouter);
app.use('/protected', protectedRoutes); // Assuming these routes should be under '/protected'


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
