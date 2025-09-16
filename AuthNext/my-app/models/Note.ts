import mongoose, { Schema, Document, Model } from "mongoose";

export interface INote extends Document {
  text: string;
}

const NoteSchema: Schema = new Schema({
  text: { type: String, required: true },
});

const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);

export default Note;
