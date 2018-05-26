var Buffer = require('../parser/buffer.js');
var assert = require('assert');

//init inputStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "buffer.test.txt");
const rl = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

var callback = function(buffer) {
    assert.equal(true, buffer.hasMore());
    assert.equal("define", buffer.current());
    assert.equal("define", buffer.pop());
    assert.equal("a", buffer.pop());
    assert.equal(true, buffer.hasMore());
    assert.equal(b, buffer.pop());
    assert.equal(false, buffer.hasMore());
}

describe("Buffer.js", function() {
    it("Buffer test", function() {
        new Buffer(rl, callback);
    })
})