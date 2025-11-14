// import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcryptjs';

// // Define TypeScript interface (optional but recommended if using TS)
// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   mobile?: string;
//   email: string;
//   password: string;
//   role: string;
//   summary?: string;
//   vesselId?: mongoose.Types.ObjectId;
  
//   createdAt: Date;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>(
//   {
//     name: { type: String, required: true },
//     mobile: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: 'user' },
//     summary: { type: String },
//     vesselId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Vessel', // 👈 references the Vessel collection
//       required: false,
//     },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   console.error("Comparing passwords:", candidatePassword, this.password);
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // Export the User model
// export const User = mongoose.model<IUser>('User', userSchema);

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define TypeScript interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // string ID
  email: string;
  password: string;
  role: string;
  assignedVesselIds: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    // Email
    email: { type: String, required: true, unique: true },

    // Hashed password
    password: { type: String, required: true },

    // Role: admin / crew
    role: { type: String, enum: ["Crew", "Admin"], default: "Crew" },

    // Assigned vessels (many-to-many)
    assignedVesselIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vessel',
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving if passwordHash is new or modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model
export const User = mongoose.model<IUser>('User', userSchema);

