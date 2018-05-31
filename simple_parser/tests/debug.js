var tokenizer = require('../tokenizer.js');

var Buffer = require('../buffer.js').Buffer;
var Parser = require('../parser.js');

//init inputStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "debug.txt");
const readlineStream = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

function evalExpressions(exps) {
    exps.forEach(exp => console.log(exp.toString()));
}

var parser = new Parser(readlineStream, evalExpressions);

