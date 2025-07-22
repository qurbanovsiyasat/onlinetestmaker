import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Update the admin user
    const adminUser = await User.findOneAndUpdate(
      { email: 'admin@example.com' },
      { role: 'admin' },
      { new: true }
    );

    if (adminUser) {
      console.log('Admin user created:', adminUser.email, 'Role:', adminUser.role);
    } else {
      console.log('Admin user not found');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
};

createAdmin();