const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailConfig = require('../emailConfig'); // Your email configuration file

// Route to create a new staff member
router.post('/', async (req, res) => {
  const { fullName, emailAddress, username, departmentId } = req.body;

  try {
    const password = generateRandomPassword(); // Function to generate a random password

    const staffMember = new Staff({
      fullName: fullName,
      emailAddress: emailAddress,
      username: username,
      password: password,
      department: departmentId
    });

    await staffMember.save();

    // Sending email notification
    const transporter = nodemailer.createTransport({
      service: emailConfig.service,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
      }
    });

    const mailOptions = {
      from: emailConfig.auth.user,
      to: emailAddress,
      subject: 'Welcome to our platform!',
      text: `Hello ${fullName},\n\nWelcome to our platform. Your username is ${username}. Your temporary password is ${password}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ success: true, message: 'Staff member created successfully!' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create staff member.' });
  }
});

// Function to generate a random password
function generateRandomPassword() {
  const randomPassword = Math.random().toString(36).slice(-8);
  return randomPassword;
}

module.exports = router;
