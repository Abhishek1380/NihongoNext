import mongoose, { Schema, Document, Model } from "mongoose";

export interface IKanji extends Document {
    kanji: string;
    onyomi: string[];
    kunyomi: string[];
    meaning: string;
    jlpt_level: string;
    default_difficulty: number;
}

const KanjiSchema: Schema = new Schema(
    {
        kanji: { type: String, required: true },
        onyomi: { type: [String], required: true },
        kunyomi: { type: [String], required: true },
        meaning: { type: String, required: true },
        jlpt_level: { type: String, required: true },
        default_difficulty: { type: Number, required: true },
    },
    { collection: "kanji" }
);

const Kanji: Model<IKanji> = mongoose.models.Kanji || mongoose.model<IKanji>("Kanji", KanjiSchema);

export default Kanji;
