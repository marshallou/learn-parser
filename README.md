# Learn Parser

## 1. Environment setup

### 1.1 NodeJS and NPM
Decide to learn parser by using JS, since function in JS is first class and at the same time can learn something about NodeJS and ES6.

- install nodeJS
- install mochajs for unit test
  - npm init
  - npm install --save-dev mocha, "--save-dev" vs "--save" https://stackoverflow.com/questions/22891211/what-is-the-difference-between-save-and-save-dev
  - add following into "package.json

``` 
"scripts": {
    "test": "./node_modules/mocha/bin/mocha scheme_evaluator/tests/*.js"
}
```
  - "npm test", to run unit tests

## 2. about the code

### 2.1 tokenizer, Lexical analysis
The tokenizer is responsible to split the string to tokens. The key is to understand what is the delimiter of the tokens for scheme.

The algorithm is like this: 
create two pointers p1 and p2 to search tokens. The two pointers first start at the same position. increment p2 until p2 points to the delimiter. Now the substring between p1 and p2 is a token.

The second step is to convert the substring token into appropriate type. For scheme, it is easy to tell the type of token by looking at first char of the substring. Thus, I created "isSingleToken", "isNumberStart" and "isStringStart" to specify different types.

At last, I find regex is extremely useful for tokenizer. Need to learn more about regex later.

### 2.2  Parser, Syntactic analysis

### 2.2.1 token stream and buffer
Parser will take tokens and convert them into proper expressions, i.e Javascript representation of expressions. The problem is that tokenizer's input is a line and output is a list of tokens. But a single expression can cross multiple lines.

Thus, we need to create a buffer which accumulates tokens. It provides "current", "pop" and "hasMore" methods for parser to retrieve tokens. So parser is decoupled from I/O related job. Parser will only need to understand tokens and how to group tokens to form expressions.

The difficulty is that to implement "current", "pop" or "hasMore", it requires blocking call to readfile. But nodeJS is not designed to be blocking. So as tradeoff, the parser pass callback into buffer which will be triggered after buffer has read all lines of a file.

This is not ideal. To improve performance, the callback should be triggered once there is token read from file, rather than waiting until finish reading the whole file.

### 2.2.2 parse
As described, parser should have method called "parse". Each time "parse" is called, it returns one expression parsed from token stream. It will be called multiple times until we get EOF exception.

### 2.2.3 data structures
After parsing, all scheme expressions will be converted to Pair. But evaluator can create abstraction to represent different scheme expressions which decoupe the internal representation Pair.

## 2.3 Evaluator

### 2.3.1 Evaluator data structrues


## 3. Learning Note
Some of the implementing details are kept in this "Learning Note" section

### mocha
  test file name convension .test.js

### JS/nodejs
- use "require" and "module.exports" to import other JS files,
- regex.test search to see if pattern exist. To match the whole string, we need to use "^" and "$"
- path.join(__dirname) can be used to generate relative path
- JS "this" is different than other language. In strict mode, this will be undefine if triggering without setting. Use "bind" or "apply" to set "this" (execution context). The difference of "bind" and "apply" is that "apply" accepts an array of argus while "call"'s argus are predefined.
- array1.concat(array2) will not modify array1, it will create a new array which append elements of array2 to array1.


### parser

## reference
https://github.com/jamiebuilds/the-super-tiny-compiler
https://github.com/starkwang/naive-complier/
JS regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
https://zhuanlan.zhihu.com/p/21830284
https://zhuanlan.zhihu.com/p/24035780
http://inst.eecs.berkeley.edu/~cs61a/fa13/proj/scheme/scheme.html
http://composingprograms.com/pages/34-interpreters-for-languages-with-combination.html#expression-trees
