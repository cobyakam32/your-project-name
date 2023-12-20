const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const staffSchema = new mongoose.Schema({
  fullName: String,
  emailAddress: String,
  designation: String,
  username: String,
  password: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
});

// Mongoose middleware to hash password before saving
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
