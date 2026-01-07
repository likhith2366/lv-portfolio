const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/Admin');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'lkhith2366' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = await Admin.create({
      username: 'lkhith2366',
      password: 'Mango##2366'
    });

    console.log('✅ Admin user created successfully');
    console.log('Username:', admin.username);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
