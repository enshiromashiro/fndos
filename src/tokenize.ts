export enum TOKEN {
  UNKNOWN = 0,
  END_OF_INPUT = 1,
  WHITESPACE = 2,
  INTEGER = 3,
  PLUS = 4,
}

export type Token = {
  ttype: TOKEN;
  s: string;
};

export const printToken = (tok: Token) => {
  switch (tok.ttype) {
    case TOKEN.UNKNOWN:
      return `UNKOWN:${tok.s}`;
    case TOKEN.END_OF_INPUT:
      return "EOI";
    case TOKEN.WHITESPACE:
      return `SP:${tok.s === "\n" ? "NL" : "SP"}`;
    case TOKEN.PLUS:
      return "PLUS";
    case TOKEN.INTEGER:
      return `INT:${tok.s}`;
  }
};

export const printTokens = (toks: Token[]) => {
  return toks.map(printToken);
};

export type TokenizerState = {
  input: string;
  tokens: Token[];
  pos: number;
};

const initTokenizer = (input: string): TokenizerState => {
  return {
    input,
    tokens: [],
    pos: 0,
  };
};

const getch = (state: TokenizerState): string | null => {
  if (state.pos === state.input.length) {
    return null;
  }
  const ch = state.input[state.pos];
  state.pos++;

  return ch;
};

export const tokenize = (input: string): Token[] => {
  const state = initTokenizer(input);

  for (let ch = getch(state); ch !== null; ch = getch(state)) {
    let tok: Token;

    if ("0123456789".indexOf(ch) !== -1) {
      tok = { ttype: TOKEN.INTEGER, s: ch };
    } else if (ch === "+") {
      tok = { ttype: TOKEN.PLUS, s: ch };
    } else if (" \n".indexOf(ch) !== -1) {
      tok = { ttype: TOKEN.WHITESPACE, s: ch };
    } else {
      const e = { ch, reasone: "unknown character" };
      console.error(e);
      throw new Error(`${e}`);
    }

    state.tokens.push(tok);
  }

  return state.tokens;
};
