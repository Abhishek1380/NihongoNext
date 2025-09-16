import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const notes = await Note.find();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching notes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    await connectDB();
    const newNote = await Note.create({ text });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating note" }, { status: 500 });
  }
}
