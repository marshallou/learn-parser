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

### 2.2  Syntactic analysis

## 3. Learning Note
Some of the implementing details are kept in this "Learning Note" section

### mocha
  test file name convension .test.js

### JS/nodejs
- use "require" and "module.exports" to import other JS files,
- regex.test search to see if pattern exist. To match the whole string, we need to use "^" and "$"


### parser

## reference
https://github.com/jamiebuilds/the-super-tiny-compiler
https://github.com/starkwang/naive-complier/
JS regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
https://zhuanlan.zhihu.com/p/21830284
https://zhuanlan.zhihu.com/p/24035780
http://inst.eecs.berkeley.edu/~cs61a/fa13/proj/scheme/scheme.html
http://composingprograms.com/pages/34-interpreters-for-languages-with-combination.html#expression-trees
