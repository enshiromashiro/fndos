import "./App.css";

const App = () => {
  return (
    <>
      <h1>funDOS</h1>
      <div id="console">
        <div id="left-pane">
          <textarea id="code" />
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
