import mongoose, { Schema, Document, model } from "mongoose";

export interface ICConsistency extends Document {
    userId: string;
    date: string;
    paragraphsRead: number;
}

const ConsistencySchema = new Schema<ICConsistency>({
    userId: { type: String, required: true },
    date: { type: String, required: true },
    paragraphsRead: { type: Number, default: 0 },
});


ConsistencySchema.index({ userId: 1, date: 1 }, { unique: true });

export const Consistency =
    mongoose.models.Consistency || model<ICConsistency>("Consistency", ConsistencySchema);
