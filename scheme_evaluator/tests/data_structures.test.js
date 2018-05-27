var Pair = require('../parser/data_structures.js').Pair;
var Nil = require('../parser/data_structures.js').Nil;
var assert = require('assert');

describe("data_structures.js", function() {
    it("test toString", function() {
        var pair = new Pair("token1", new Pair(3, new Nil()));
        assert.equal("Pair(token1, Pair(3, Nil))", pair.toString());
    })
})