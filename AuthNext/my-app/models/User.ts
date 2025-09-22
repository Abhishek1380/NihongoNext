import mongoose, { Schema, Document, Model } from 'mongoose';
// import { unique } from 'next/dist/build/utils';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: Date
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;