import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = (await req.json()) as { email: string; password: string };

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        const token = signToken({ id: user._id, email: user.email });

        return NextResponse.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
