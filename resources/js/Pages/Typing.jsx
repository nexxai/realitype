import { useState, useEffect, useReducer } from "react";
import TextArea from "../Components/TextArea";
const initialState = { displayWords: [] };

const checkWordAPI = async (wordObject) => {
    // console.log(wordObject);
    const data = new URLSearchParams();
    data.append("word", wordObject.word);

    const response = await fetch("/word/validate", {
        method: "POST",
        body: data,
    });

    let updated = await updateWord(wordObject, await response.json());
    return updated;
};

const updateWord = (wordObject, data) => {
    if (data.results) {
        wordObject.correct = data.results.exact;
        wordObject.status = data;
        wordObject.display = data.results.word;
    }
    return wordObject;
};

function updateTypedText(wordObject, typedText, setTypedText, index) {
    let tempTypedText = typedText;
    tempTypedText[index] = wordObject.display;
    setTypedText(tempTypedText);
}

function reducer(state, action) {
    const payload = action.payload;
    let tempWords = state.displayWords;

    switch (action.type) {
        case "setWord":
            // We know of a word in this spot already
            if (tempWords[payload.index]) {
                // The word is the same as the one we know about so we don't need to recheck it
                if (tempWords[payload.index].word === payload.wordObject.word) {
                    return state;
                } else {
                    // The word is different so we need to recheck it
                    if (payload.autoCorrect) {
                        Promise.resolve(checkWordAPI(payload.wordObject)).then(
                            (checkedWord) => {
                                // Update the known words
                                tempWords[payload.index] = checkedWord;

                                // Update the text inside the text area
                                updateTypedText(
                                    checkedWord,
                                    payload.typedText,
                                    payload.setTypedText,
                                    payload.wordObject.typedTextIndex,
                                );
                            },
                        );
                    }
                }
            } else {
                tempWords[payload.index] = payload.wordObject;
            }

            return { ...state, displayWords: tempWords };
        default:
            return state;
    }
}

export default function Typing() {
    const [typedText, setTypedText] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const autoCorrect = typedText[typedText.length - 1] == "";
        for (const [index, word] of typedText.entries()) {
            let wordObject = {
                word,
                typedTextIndex: index,
                correct: false,
                display: word,
            };

            dispatch({
                type: "setWord",
                payload: {
                    index,
                    wordObject,
                    typedText,
                    setTypedText: (prev) => setTypedText([...prev]),
                    autoCorrect,
                },
            });
        }
    }, [typedText]);

    const checkText = (e) => {
        const input = e.target.value;
        const typedWords = input.split(/[\s\r\n]+/);
        setTypedText(typedWords);
    };

    return (
        <>
            <div className="w-screen h-screen bg-gradient-to-b from-black to-purple-950  flex items-center justify-center">
                <TextArea
                    typedText={typedText}
                    autoFocus={true}
                    checkText={checkText}
                ></TextArea>
            </div>
        </>
    );
}
