var tokenizer = require('../parser/tokenizer.js');
var Buffer = require('../parser/buffer.js');

//init inputStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "buffer.test.txt");
const rl = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

var callback = function(buffer) {
        var hasMore1 = buffer.hasMore();
        var tok1 = buffer.current();
        var tok2 = buffer.pop();
        var tok3 = buffer.pop();
        var hasMore2 = buffer.hasMore();
        var tok4 = buffer.pop();
        var hasMore3 = buffer.hasMore();
}

var buffer = new Buffer(rl, callback);
