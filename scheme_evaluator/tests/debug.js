var tokenizer = require('../parser/tokenizer.js');
var Buffer = require('../parser/buffer.js');

//init inputStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "buffer.debug.txt");
const rl = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

var callback = function(buffer) {
        buffer.testTokens().forEach(token => console.log("token: " + token));
}

var buffer = new Buffer(rl, callback);
