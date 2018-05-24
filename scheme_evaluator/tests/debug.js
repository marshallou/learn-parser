var tokenizer = require('../tokenizer.js');

var line = "(define (sub-5 x) (+ x -5.3))";
var tokens = tokenizer.tokenize(line);
tokens.forEach(str => console.log(str));