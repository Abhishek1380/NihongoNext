import React, { useState } from "react";

const RomajiTyping: React.FC = () => {
    const romajiParagraph = "konnichiwa sekai";
    const correctHiragana = "こんにちはせかい";

    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState<JSX.Element | string>("");

    const handleKeyPress = (char: string) => setUserInput(prev => prev + char);

    const handleBackspace = () => setUserInput(prev => prev.slice(0, -1));

    const handleSubmit = () => {
        if (userInput === correctHiragana) {
            setResult("Great job! ✅");
        } else {
            const highlighted = correctHiragana.split("").map((char, i) => {
                if (userInput[i] !== char) return <span key={i} className="text-red-500">{userInput[i] || "_"}</span>;
                return <span key={i}>{char}</span>;
            });
            setResult(<>{highlighted}</>);
        }
    };

    const keys: string[][] = [
        ["あ", "い", "う", "え", "お"],
        ["か", "き", "く", "け", "こ"],
        ["さ", "し", "す", "せ", "そ"],
        ["た", "ち", "つ", "て", "と"],
        ["な", "に", "ぬ", "ね", "の"],
        ["は", "ひ", "ふ", "へ", "ほ"],
        ["ま", "み", "む", "め", "も"],
        ["や", "ゆ", "よ"],
        ["ら", "り", "る", "れ", "ろ"],
        ["わ", "を", "ん"],
        ["っ", "ゃ", "ゅ", "ょ"]
    ];

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Romaji to Hiragana</h2>

            <div className="border p-3 mb-4 rounded bg-gray-50">{romajiParagraph}</div>

            <div className="border p-3 mb-4 min-h-[50px] text-lg rounded bg-white">{userInput}</div>

            <div className="mb-4">
                {keys.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-1">
                        {row.map(k => (
                            <button
                                key={k}
                                onClick={() => handleKeyPress(k)}
                                className="px-3 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                ))}
                <div className="flex justify-center">
                    <button
                        onClick={handleBackspace}
                        className="px-4 py-2 bg-orange-400 rounded text-white hover:bg-orange-500 transition"
                    >
                        Backspace
                    </button>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-4"
            >
                Submit
            </button>

            <div className="min-h-[50px] text-lg">{result}</div>
        </div>
    );
};

export default RomajiTyping;
