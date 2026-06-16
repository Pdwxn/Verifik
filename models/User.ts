import mongoose, { Schema, Document, Model } from 'mongoose'
import type { IUser } from '@/types/user'

export interface UserDocument extends Omit<IUser, '_id'>, Document {}

const HealthProfileSchema = new Schema(
  {
    conditions: { type: [String], default: [] },
    allergies: { type: [String], default: [] },
    preferences: { type: [String], default: [] },
    skinType: String,
  },
  { _id: false }
)

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: String,
    avatarUrl: String,
    healthProfile: { type: HealthProfileSchema, default: () => ({}) },
  },
  { timestamps: true }
)

const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>('User', UserSchema)

export default User
