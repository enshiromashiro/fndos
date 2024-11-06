import { type Result, err, ok } from "./result";
import { TOKEN, type Token } from "./tokenize";

export type BinaryPlusOp = {
  operand1: number;
  operand2: number;
};

export type Program = BinaryPlusOp;

type ParserState = {
  toks: Token[];
  pos: number;
};
type state = ParserState;

class ParseError extends Error {
  readonly token: Token | null;
  readonly reason: string;

  constructor(tok: Token | null, reason: string) {
    const msg = `tok = ${tok}, reason = ${reason}`;
    super(msg);
    this.token = tok;
    this.reason = reason;
  }
}
const parseErr = (tok: Token | null, reason: string) =>
  new ParseError(tok, reason);

type ParserResult = Result<Program, ParseError>;

const initParser = (toks: Token[]): state => {
  return { toks, pos: 0 };
};

const endOfInput = (state: state): boolean => state.pos >= state.toks.length;
const peekTok = (state: state): Token | null =>
  endOfInput(state) ? null : state.toks[state.pos];
const getTok = (state: state): Token | null =>
  endOfInput(state) ? null : state.toks[state.pos++];

const skipWhitespaces = (s: state): void => {
  for (
    let tok = peekTok(s);
    tok && tok.kind === TOKEN.WHITESPACE;
    tok = peekTok(s)
  ) {
    getTok(s);
  }
};

const _parse = (state: state): ParserResult => {
  skipWhitespaces(state);
  const tok1 = getTok(state);
  if (!tok1 || tok1.kind !== TOKEN.INTEGER) {
    return err(parseErr(tok1, "is not an integer"));
  }

  skipWhitespaces(state);
  const tok2 = getTok(state);
  if (!tok2 || tok2.kind !== TOKEN.PLUS) {
    return err(parseErr(tok2, "is not PLUS operator"));
  }

  skipWhitespaces(state);
  const tok3 = getTok(state);
  if (!tok3 || tok3.kind !== TOKEN.INTEGER) {
    return err(parseErr(tok3, "is not an integer"));
  }

  return ok({ operand1: tok1.value, operand2: tok3.value });
};

export const parse = (toks: Token[]): ParserResult => _parse(initParser(toks));
