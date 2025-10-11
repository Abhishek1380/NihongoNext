import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { Consistency } from "@/models/Consistency";
import { z } from "zod";

const updateSchema = z.object({ paragraphsRead: z.number().min(0) });

async function getUserFromReq(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return null;
    const payload = verifyToken(token) as { id: string; email: string } | null;
    return payload;
}

export async function GET(req: NextRequest) {
    await connectDB();
    const user = await getUserFromReq(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const today = new Date().toISOString().slice(0, 10);
    const record = await Consistency.findOne({ userId: user.id, date: today });

    return NextResponse.json({ paragraphsRead: record?.paragraphsRead ?? 0 });
}

export async function POST(req: NextRequest) {
    await connectDB();
    const user = await getUserFromReq(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = updateSchema.parse(body);

    const today = new Date().toISOString().slice(0, 10);

    const updated = await Consistency.findOneAndUpdate(
        { userId: user.id, date: today },
        { paragraphsRead: parsed.paragraphsRead },
        { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, record: updated });
}
