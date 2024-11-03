export const name = "FN-DOS";
export const version = __APP_VERSION__;
export const prompt = "? ";
export const inputPlaceholder = "type something...";

const description = [
  `${name} version ${version}`,
  "Copyright 2024 by Whitespace Laboratory",
];
const firstHelp = [
  "Type commands in the left and type Ctrl + Enter. So it evaluates input and pinrt result in the right.",
];

export const makeInitialOutput = () => {
  const desc = description.join("\n");
  const help = firstHelp.join("\n");
  return `${desc}\n\n${help}\n\n${prompt}`;
};

export const makeNewOutput = (input: string, output: string) =>
  `${output}${input}\n${prompt}`;
