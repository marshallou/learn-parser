var Buffer = require('../parser/buffer.js');
var assert = require('assert');

describe("Buffer.js", function() {
    it("Buffer test", function() {
        var tokenList = [["tok1", "tok2"], [], ["tok3", "tok4"], []];
        var buffer = new Buffer(tokenList);
        assert.equal("tok1", buffer.pop());
        assert.equal("tok2", buffer.current());
        assert.equal("tok2", buffer.pop());
        assert.equal("tok3", buffer.pop());
        assert.equal(true, buffer.hasMore());
        assert.equal("tok4", buffer.pop());
        assert.equal(false, buffer.hasMore());
        assert.equal(null, buffer.current());
        assert.equal(null, buffer.pop());
    })
})