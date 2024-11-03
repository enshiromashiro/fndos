import type { KeyboardEvent } from "react";

type KeyEvent = KeyboardEvent<HTMLTextAreaElement>;

const CodeArea = () => {
  const handleKeyDown = (e: KeyEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      console.log("ctrl + enter!!!!");
    }
  };

  return (
    <div id="code">
      <textarea onKeyDown={handleKeyDown} />
    </div>
  );
};
export default CodeArea;
