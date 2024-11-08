import { useState } from "react";
import "./App.css";
import InputArea from "./console/InputArea";
import OutputArea from "./console/OutputArea";
import { SYSTEM_NAME } from "./const";
import { type Shell, evaluate, initializeShell } from "./shell";

const App = () => {
  const [input, setInput] = useState<string>("");
  const [shell, setShell] = useState<Shell>(initializeShell());

  const onEnter = () => {
    evaluate(shell, input);
    setInput("");
    setShell(shell);
    // TODO: ここでOutputAreaを最後の行までスクロールさせたい
  };

  return (
    <>
      <h1>{SYSTEM_NAME}</h1>
      <div id="console">
        <div id="left-pane">
          <InputArea input={input} setInput={setInput} onEnter={onEnter} />
        </div>
        <div id="right-pane">
          <OutputArea output={shell.output} />
        </div>
      </div>
    </>
  );
};
export default App;
