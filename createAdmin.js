// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./server/models/user'); // Update the path according to your project structure
require('dotenv').config(); // If you're using dotenv to manage environment variables

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = 'stevenhhb';
    const password = 'GraceGuo0708@'; // Choose a strong password in production
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the admin user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Create a new admin user
    const adminUser = new User({
      username,
      password: hashedPassword
    });
    await adminUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

createAdminUser();
