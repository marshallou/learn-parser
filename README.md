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

### 2.2 token stream and buffer
Parser will take tokens and convert them into proper expressions, i.e Javascript representation of expressions. The problem is that tokenizer's input is a line and output is a list of tokens. But a single expression can cross multiple lines.

Thus, we need to create a buffer which accumulates tokens. It provides "current", "pop" and "hasMore" methods for parser to retrieve tokens. So parser is decoupled from I/O related job. Parser will only need to understand tokens and how to group tokens to form expressions.

The difficulty is that to implement "current", "pop" or "hasMore", it requires blocking call to readfile. But nodeJS is not designed to be blocking. So as tradeoff, the parser pass callback into buffer which will be triggered after buffer has read all lines of a file.

This is not ideal. To improve performance, the callback should be triggered once there is token read from file, rather than waiting until finish reading the whole file.

## 2.3 Parser, Syntactic analyze
Parser's input is a token stream and output is expressions. So it is parser's responsibility to do
syntactic analyze. Meaning, It needs to understand how tokens is grouped into a single expression
and how a single expression can be used as subexpression to build a larger expression. 

### 2.3.1 AST
I have not learned what is AST. But my guess is that it is a standard data structure used to parse
tokens. As described previously tokens form expression. Then the expression can be used to build 
a larger expression. So expression can be represented as a tree structure natually.

### 2.3.2 My implementation
I guess normally parser's job is just to build AST. Then compiler will take AST to do rest of the 
job, e.g code generation.

But for my current implementation, instead of returning AST, the "parseExpression" method will return "Pair", an internal representation of expression. So the result of "parseExpression" can be sent to 
"evaluator" directly.

Later, after I learned AST, I will modify it to generate AST.

### 2.3.3 Algorithms
Scheme is using "(", ")" to group tokens into expression. Each element inside "(", ")" can either be
a symbol (base case) or a subexpression (compound case). The subexpression is again inside  "(", ")". 
So it is natual to use recursion to solve the problem.

The idea is to use two mutual recursive functions to parse the tokens: parseExpression, 
parseCompoundExpressions.

parseExpression: 
  If the token is a symbol (base case), parseExpression will return the symbol directly.
  if the token is "(", it will call parseCompoundExpression to parse the compound expression.

parseCompoundExpression:
  If the token is ")", it will return nil (base case). 
  If the token is "(", which means the next element is again a compound expression. So we call
    parseExpression to get first element and set it as Pair.left. Then call parseCompoundExpression
    recursively and set the result as Pair.right.
  If the token is symbol, set it as Pair.left. Then call parseCompoundExpression recursively and set
    the result as Pair.right.

Note: I do not define parseExpression and parseCompoundExpression as part of "Parser" class.
Because I need to pass "parse" as callback to Buffer. Since parse will call "parseExpression"
and "parseCompoundExpression", when writing code, I have to call bind "this" which looks 
weird.

### 2.3.4 usage
As described previously, "parseExpression" takes a token stream as input and return an expression. 
"parseExpression" should be called mulitple times by the user of Parser until all expressions in the 
token steam has been parsed.


### 2.3.5 data structures used by Parser
Pair
Nil

## 2.4 Evaluator

### 2.4.1 Evaluator data structrues


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
