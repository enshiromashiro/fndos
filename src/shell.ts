import { SYSTEM_COMMIT_ID, SYSTEM_NAME, SYSTEM_VERSION } from "./const";
import { parse } from "./parse";
import { printTokens, tokenize } from "./tokenize";

export const inputPlaceholder = "type something...";
const prompt = "? ";

const info = [
  `${SYSTEM_NAME} version ${SYSTEM_VERSION} (${SYSTEM_COMMIT_ID})`,
  "Copyright 2024 by Whitespace Laboratory",
];
const help = [
  "Type commands in the left and type Ctrl + Enter. So it evaluates input and pinrt result in the right.",
  "Now, here is an addition only.",
];
const initialOutput = `${info.join("\n")}\n\n${help.join("\n")}\n\n${prompt}`;

export type Shell = {
  inputHistory: string[];
  output: string;
};

export const initializeShell = (): Shell => {
  const shell = {
    inputHistory: [],
    output: initialOutput,
  };
  return { ...shell };
};

const writeline = (sh: Shell, line: string) => {
  sh.output = `${sh.output}\n${line}`;
};

const writeErr = (sh: Shell, msg: string) => {
  writeline(sh, `err: ${msg}`);
};

const writeResult = (sh: Shell, input: string, result: string) => {
  sh.inputHistory.push(input);
  sh.output = `${sh.output}${input}\n${result}\n${prompt}`;
};

export const evaluate = (sh: Shell, input: string) => {
  if (input.trim() === "fndOS") {
    writeResult(sh, input, "fndOS is a fundumental norinori dokidoki OS implementation");
    return;
  }

  const _toks = tokenize(input);
  if (_toks.err()) {
    writeErr(sh, _toks.error.message);
    return sh;
  }
  const toks = _toks.value;
  console.log(printTokens(toks));

  const _prog = parse(toks);
  if (_prog.err()) {
    writeErr(sh, _prog.error.message);
    return sh;
  }
  const prog = _prog.value;

  const result = `${prog.operand1 + prog.operand2}`;
  writeResult(sh, input, result);
};
