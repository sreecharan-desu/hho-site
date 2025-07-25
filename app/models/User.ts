import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

// Define the User schema
const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
  },
});

// Prevent model recompilation in development
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;