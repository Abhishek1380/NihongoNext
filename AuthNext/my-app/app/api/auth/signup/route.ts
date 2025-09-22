import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from "bcrypt";
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { name, email, password } = (await req.json()) as {
            name: string,
            email: string,
            password: string
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User exists already" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "SignUp successful", userId: user._id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}