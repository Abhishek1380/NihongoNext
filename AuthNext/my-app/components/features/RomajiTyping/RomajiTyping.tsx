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
            setResult(<span className="text-green-600 font-bold">Great job! ✅</span>);
        } else {
            const highlighted = correctHiragana.split("").map((char, i) => {
                if (userInput[i] !== char)
                    return <span key={i} className="text-red-500 font-bold">{userInput[i] || "_"}</span>;
                return <span key={i} className="text-gray-800">{char}</span>;
            });
            setResult(<div className="flex flex-wrap gap-1">{highlighted}</div>);
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
        <div className="p-6 max-w-xl mx-auto bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <h2 className="text-2xl font-extrabold mb-4 text-center text-gray-800">Romaji → Hiragana</h2>

            <div className="border p-3 mb-4 rounded bg-white shadow-sm text-center font-mono">
                {romajiParagraph}
            </div>

            <div className="border p-3 mb-4 min-h-[50px] text-lg rounded bg-gray-50 shadow-inner font-mono text-center">
                {userInput || <span className="text-gray-400">Type here...</span>}
            </div>

            <div className="mb-4">
                {keys.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-1">
                        {row.map(k => (
                            <button
                                key={k}
                                onClick={() => handleKeyPress(k)}
                                className="px-4 py-2 mx-1 bg-white border border-gray-300 rounded shadow hover:bg-gray-200 transition"
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                ))}
                <div className="flex justify-center mt-2">
                    <button
                        onClick={handleBackspace}
                        className="px-5 py-2 bg-red-400 rounded text-white font-semibold hover:bg-red-500 transition shadow"
                    >
                        Backspace
                    </button>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 shadow transition mb-4"
            >
                Submit
            </button>

            <div className="min-h-[50px] text-lg text-center">{result}</div>
        </div>
    );
};

export default RomajiTyping;
