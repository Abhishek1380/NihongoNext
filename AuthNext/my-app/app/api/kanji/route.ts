// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Kanji from "../../../models/Kanji";


// export async function GET() {
//     try {
//         await connectDB();

//         const kanjiData = await Kanji.find();

//         return NextResponse.json(kanjiData, { status: 200 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { error: "Error fetching kanji from database" },
//             { status: 500 }
//         );
//     }
// }




import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Kanji from "../../../models/Kanji";

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const level = searchParams.get("level"); // e.g. "N4"

        let query = {};
        if (level) {
            query = { jlpt_level: level };
        }

        const kanjiData = await Kanji.find(query);

        return NextResponse.json(kanjiData, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error fetching kanji from database" },
            { status: 500 }
        );
    }
}

