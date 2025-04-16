const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://vinayguleria617:Vinay2004$@cluster0.wa9on.mongodb.net/campus_recruitment';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove existing admin if exists
    await Admin.deleteOne({ email: 'agk7186@gmail.com' });
    console.log('Removed existing admin if any');

    // Create new admin user with a valid password
    const adminUser = new Admin({
      email: 'agk7186@gmail.com',
      password: 'Admin123456', // Simple alphanumeric password that matches the pattern
      firstName: 'Hemant',
      lastName: 'Kumar',
      status: 'ACTIVE'
    });

    // Validate password format
    if (!adminUser.validatePassword(adminUser.password)) {
      throw new Error('Invalid password format. Password must be 6-64 characters long and contain only letters, numbers, and special characters (@$!%*?&)');
    }

    await adminUser.save();
    console.log('Admin user created successfully:', adminUser.email);
    console.log('Please use the following credentials to login:');
    console.log('Email: agk7186@gmail.com');
    console.log('Password: Admin123456');

    // Delete the user from users collection if exists
    try {
      const User = mongoose.model('User');
      await User.deleteOne({ email: 'agk7186@gmail.com' });
    } catch (error) {
      // Ignore error if User model doesn't exist
      console.log('Note: User collection cleanup skipped');
    }

  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedAdmin(); 