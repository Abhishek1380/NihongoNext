import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Paragraph, { IParagraph } from "../../../../models/Paragraph";



interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
    try {
        await connectDB();

        const paragraph = await Paragraph.findById(params.id);

        if (!paragraph) {
            return NextResponse.json({ message: "Paragraph not found" }, { status: 404 });
        }

        return NextResponse.json(paragraph, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
