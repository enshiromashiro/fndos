interface ResultIF {
  ok(): boolean;
  err(): boolean;
}

class Ok<T> implements ResultIF {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  ok(): this is Ok<T> {
    return true;
  }

  err(): this is Err<Error> {
    return false;
  }
}

class Err<E extends Error> implements ResultIF {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  ok(): this is Ok<unknown> {
    return false;
  }

  err(): this is Err<E> {
    return true;
  }
}

export type Result<T, E extends Error> = Ok<T> | Err<E>;
export const ok = <T>(v: T): Ok<T> => new Ok(v);
export const err = <E extends Error>(e: E): Err<E> => new Err(e);
