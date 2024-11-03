import "./App.css";
import CodeArea from "./components/CodeArea";

const App = () => {
  return (
    <>
      <h1>funDOS</h1>
      <div id="console">
        <div id="left-pane">
          <CodeArea />
        </div>
        <div id="right-pane">
          <textarea
            id="output"
            readOnly={true}
            placeholder="; -> blah blah blah"
          />
        </div>
      </div>
    </>
  );
};
export default App;
