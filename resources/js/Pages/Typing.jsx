import { useState } from "react";
export default function Typing() {
    const [words, setWords] = useState([]);
    const [checkedWords, setCheckedWords] = useState([]);
    const [typedText, setTypedText] = useState("");

    const checkText = (event) => {
        const input = event.target.value;
        setTypedText(input);

        if (!input.match(/^[a-zA-Z\s]/)) {
            return;
        }

        const rawWords = input.trim().split(" ");
        setWords(rawWords);
        let lastWord = {
            word: rawWords[rawWords.length - 1],
            checked: false,
        };

        const enteredChar = input.slice(-1);
        if (enteredChar === " ") {
            checkWord(lastWord.word).then((data) => {
                lastWord.checked = true;
                lastWord.status = data;
                setCheckedWords([...checkedWords, lastWord]);
                if (data.results.replacement_found) {
                    const fixedTest = input.replace(
                        lastWord.word,
                        data.results.word,
                    );
                    setTypedText(fixedTest);
                }
            });
        }
    };

    const checkWord = async (word) => {
        const data = new URLSearchParams();
        data.append("word", word);
        const response = await fetch("/word/validate", {
            method: "POST",
            body: data,
        });

        return response.json();
    };

    return (
        <>
            <div className="w-screen h-screen bg-slate-400 flex items-center justify-center">
                <textarea
                    value={typedText}
                    autoCorrect="on"
                    name="test"
                    rows="20"
                    cols="100"
                    autoFocus={true}
                    onChange={(e) => checkText(e)}
                ></textarea>
            </div>
        </>
    );
}
