# fndOS

A system for fun.

## memo

this section is just a memo.

```
;;;;;; fundus - it's a nanka super tanoshiiii programming language
;;;;;;
;;;;;; and this is a sketch for fundus.
;;;;;;

;;;;;; syntax: line comments
;;;;;;

; this is a line comment
; line comments start with `;` (semi-colon)
; yeah I love Lisp so much :p
;
; TODO: decide this -> multi-line comments? needed?

; here is a doc comment for a flonum constant `SAMPLE_RATE`
; doc comments start with `;;;` (three semi-colons)
; we can write docs with CommonMark in doc comennts
;
; the target of one doc comment is an entity placed after the comment
;
; the first line of one doc comment is a short description for the target
; the subject of short description should be the target
;
; trailing lines are treated as a long description
; allowed some empty lines between short and long description

;;; A sampling rate for audio output.
;;;
;;; For more details, See [an article about that](https://example.com).
let const SAMPLE_RATE: flonum = 3.14159265458979    ; `flonum` is a temporary type name for floting numbers


;;;;;; syntax: importing modules
;;;;;;

; import a module `util` from `string` module
; we can use it like this `util.func1()`
use string.util

; import a module `string.util` as the name `strutil`
; we can use it like this `strutil.func1()`
use string.util as strutil

; import a function `format` from `str.string` module
; importing module members are needs `{member1, member2 as mem2, ...}` like syntax
; we can use it like this `member1(args...)`, `mem2()`
use str.string.{format}

;;;;;; syntax: constant declaration
;;;;;;

; define a `str` type variable `hello` as a constant
;
; for constants, I think they should have these types
;
; I think variables should be immutable by default,
; and global mutable variables are unneccesary.
;
const greeting: str = "hello";

;;;;;; syntax: function declaration
;;;;;; and (lexical scoped?) local variables
;;;;;;

;;;; Print a greeting message including `name`
fn show_greeting(name: str) -> str {
  ; define a lexical variable
  let msg = "{}, {}"
  ; that previously defined variable is shadowed by a new variable has same name
  let msg = format(greeting, s)

  ; discard a value returned by `print()`
  let _ = print(s)

  ; simply place a value to return
  ; yeah this means fundus is an expression-oriented language
  s
}

fn main() {
    show_greeting()
}

;;;;;; syntax: module declaration
;;;;;;

; normaly, file is a module
; so filenames are module names

; if we need mutiple or nested modules in a file,
; use module definition statement like this:

mod foo {
  mod bar {
    const msg: str = "happy"
  }

  mod buz {
    const msg: str = "hacking"
  }
}

fn message() {
    print(format()"{} {}", foo.bar.msg, foo.buz.msg)
}

; TODO: how we specify publicity for module members?
```

## Author

- enshiromashiro

## License

[MIT License](LICENSE)
