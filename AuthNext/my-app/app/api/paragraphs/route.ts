// app/api/paragraphs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const paragraphSchema = new mongoose.Schema({
    japanese_paragraph: String,
    romaji_paragraph: String,
    english_paragraph: String,
    length: String,
    level: String,
    date: Date,
    img: String,
});

const Paragraph = mongoose.models.Paragraph || mongoose.model("Paragraph", paragraphSchema);

export const GET = async () => {
    try {
        await connectDB();
        const paragraphs = await Paragraph.find({}).sort({ date: 1 }).lean();
        return NextResponse.json(paragraphs);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch paragraphs" }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const body = await req.json();

        const newParagraph = new Paragraph({
            japanese_paragraph: body.japanese_paragraph,
            romaji_paragraph: body.romaji_paragraph,
            english_paragraph: body.english_paragraph,
            length: body.length,
            level: body.level,
            date: body.date ? new Date(body.date) : new Date(),
            img: body.img || "",
        });

        await newParagraph.save();

        // ✅ Must return JSON
        return NextResponse.json({
            message: "Paragraph added successfully",
            paragraph: newParagraph,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add paragraph" }, { status: 500 });
    }
};
