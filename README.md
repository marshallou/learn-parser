# Learn Parser

## 1. Environment setup

### 1.1 NodeJS and NPM
Decide to learn parser by using JS, since function in JS is first class and at the same time can learn something about NodeJS and ES6.

- install nodeJS
- install mochajs for unit test
  - npm init
  - npm install --save-dev mocha, "--save-dev" vs "--save" https://stackoverflow.com/questions/22891211/what-is-the-difference-between-save-and-save-dev
  - add following into "package.json
 
"scripts": {
    "test": "./node_modules/mocha/bin/mocha scheme_evaluator/tests/*.js"
}

  - "npm test", to run unit tests

## 2.learning note

### mocha
  test file name convension .test.js

### nodejs
  use "require" and "module.exports" to import file other JS files

### parser

## reference
https://github.com/jamiebuilds/the-super-tiny-compiler
https://github.com/starkwang/naive-complier/
JS regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
https://zhuanlan.zhihu.com/p/21830284
https://zhuanlan.zhihu.com/p/24035780
http://inst.eecs.berkeley.edu/~cs61a/fa13/proj/scheme/scheme.html
http://composingprograms.com/pages/34-interpreters-for-languages-with-combination.html#expression-trees
