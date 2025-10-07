import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IParagraph extends Document {
    japanese_paragraph: string;
    romaji_paragraph: string;
    english_paragraph: string;
    length?: string;
    level?: string;
    date?: string;
    img?: string;
}

const ParagraphSchema = new Schema<IParagraph>({
    japanese_paragraph: { type: String, required: true },
    romaji_paragraph: { type: String, required: true },
    english_paragraph: { type: String, required: true },
    length: { type: String },
    level: { type: String },
    date: { type: String },
    img: { type: String },
});

const Paragraph = models.Paragraph || model<IParagraph>("Paragraph", ParagraphSchema);

export default Paragraph;
