import type { KeyboardEvent } from "react";
import { inputPlaceholder } from "../shell";

type InputAreaProps = {
  input: string;
  setInput: (i: string) => void;
  onEnter: () => void;
};

const InputArea = ({ input, setInput, onEnter }: InputAreaProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div id="input">
      <textarea
        value={input}
        placeholder={inputPlaceholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default InputArea;
