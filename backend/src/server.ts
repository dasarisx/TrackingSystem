import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';
import { User } from "./models/user";

dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Creates the admin user if it doesn’t already exist.
 */
const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("Admin credentials are not set in environment variables");
      return;
    }

    // check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // create the admin user
    const adminUser = new User({
      email: adminEmail,
      password: adminPassword,
      role: "Admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

connectDB().then(async () => {
  await createAdminUser();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("DB connection failed:", err);
});


