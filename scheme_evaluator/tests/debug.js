var tokenizer = require('../parser/tokenizer.js');
var Buffer = require('../parser/buffer.js').Buffer;
var Pair = require('../parser/data_structures.js').Pair;
var Nil = require('../parser/data_structures.js').Nil;

//init inputStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "buffer.debug.txt");
const rl = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

function evalExpressions(exps) {
    exps.forEach(exp => console.log(exp));
}

var pair = new Pair("token1", new Pair("token2", new Nil()));
console.log(pair.toString());
//var buffer = new Buffer(rl, callback);


