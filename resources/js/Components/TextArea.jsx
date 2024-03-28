export default function TextArea(props) {
    return (
        <textarea
            value={props.typedText.join(" ")}
            name="test"
            autoCorrect="off"
            spellCheck="false"
            rows="4"
            cols="100"
            autoFocus={props.autofocus || true}
            onChange={(e) => props.checkText(e)}
            className="text-2xl font-semibold text-purple-500 bg-transparent focus:ring-0 focus:border-0 border-0 p-8 select-purple-200"
        ></textarea>
    );
}
