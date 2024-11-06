import { type Result, err, ok } from "./result";

export enum TOKEN {
  END_OF_INPUT = 1,
  WHITESPACE = 2,
  INTEGER = 3,
  PLUS = 4,
}

type EndOfInputToken = {
  kind: TOKEN.END_OF_INPUT;
};
type WhitespaceToken = {
  kind: TOKEN.WHITESPACE;
  spaces: string;
};
type IntegerToken = {
  kind: TOKEN.INTEGER;
  value: number;
};
type PlusToken = {
  kind: TOKEN.PLUS;
};

export type Token =
  | EndOfInputToken
  | WhitespaceToken
  | IntegerToken
  | PlusToken;

export const printToken = (tok: Token) => {
  switch (tok.kind) {
    case TOKEN.END_OF_INPUT:
      return "EOI";
    case TOKEN.WHITESPACE:
      return `SP:${tok.spaces === "\n" ? "NL" : "SP"}`;
    case TOKEN.PLUS:
      return "PLUS";
    case TOKEN.INTEGER:
      return `INT:${tok.value}`;
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

const endOfInput = (state: TokenizerState): boolean =>
  state.pos >= state.input.length;
const peekch = (state: TokenizerState): string | null =>
  endOfInput(state) ? null : state.input[state.pos];
const getch = (state: TokenizerState): string | null =>
  endOfInput(state) ? null : state.input[state.pos++];

const DIGITS = "0123456789";
const isDigit = (ch: string): boolean => DIGITS.includes(ch);
const WHITESPACES = " \n";
const isWhitespace = (ch: string): boolean => WHITESPACES.includes(ch);

const stringToInteger = (digits: string): number => {
  let n = 0;
  for (let i = 1; i <= digits.length; i++) {
    const c = digits[digits.length - i];
    n += DIGITS.indexOf(c) * 10 ** (i - 1);
  }
  return n;
};

class TokenizeError extends Error {
  readonly ch: string;
  readonly reason: string;

  constructor(ch: string, reason: string) {
    const msg = `ch = ${ch}, reason = ${reason}`;
    super(msg);

    this.ch = ch;
    this.reason = reason;
  }
}

const _tokenize = (state: TokenizerState): Result<Token[], TokenizeError> => {
  for (let ch = peekch(state); ch !== null; ch = peekch(state)) {
    let tok: Token;

    if (isDigit(ch)) {
      getch(state);
      const chlis = [ch];
      for (ch = peekch(state); ch && isDigit(ch); ch = peekch(state)) {
        chlis.push(ch);
        getch(state);
      }
      tok = { kind: TOKEN.INTEGER, value: stringToInteger(chlis.join("")) };
    } else if (ch === "+") {
      getch(state);
      tok = { kind: TOKEN.PLUS };
    } else if (isWhitespace(ch)) {
      getch(state);
      const chlis = [ch];
      for (ch = peekch(state); ch && isWhitespace(ch); ch = peekch(state)) {
        chlis.push(ch);
        getch(state);
      }
      tok = { kind: TOKEN.WHITESPACE, spaces: chlis.join("") };
    } else {
      const e = new TokenizeError(ch, "unknown character");
      return err(e);
    }

    state.tokens.push(tok);
  }

  return ok(state.tokens);
};

export const tokenize = (input: string): Result<Token[], TokenizeError> =>
  _tokenize(initTokenizer(input));
