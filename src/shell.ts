import { parse } from "./parse";
import { printTokens, tokenize } from "./tokenize";

export const name = "FN-DOS";
export const version = __APP_VERSION__;
export const inputPlaceholder = "type something...";
const prompt = "? ";

const info = [
  `${name} version ${version}`,
  "Copyright 2024 by Whitespace Laboratory",
];
const help = [
  "Type commands in the left and type Ctrl + Enter. So it evaluates input and pinrt result in the right.",
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

export const evaluate = (sh: Shell, input: string): Shell => {
  const _toks = tokenize(input);
  if (_toks.err()) {
    writeErr(sh, _toks.error.message);
    return sh;
  }

  const toks = _toks.value;
  console.log(printTokens(toks));

  const ast = parse(toks);
  console.log(ast);

  const result = `ast = ${ast}`;

  return {
    inputHistory: [...sh.inputHistory, input],
    output: `${sh.output}${input}\n${result}\n${prompt}`,
  };
};
