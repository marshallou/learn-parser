var tokenizer = require('../parser/tokenizer.js');
var Buffer = require('../parser/buffer.js');

var line = "(define (sub-5 x) (+ x -5.3))";
var tokens = tokenizer.tokenize(line);
tokens.forEach(str => console.log(str));

var tokenList = [["tok1", "tok2"], [], ["tok3", "tok4"]];
        var buffer = new Buffer(tokenList);
        buffer.pop()
        buffer.pop()
        console.log(buffer.pop())