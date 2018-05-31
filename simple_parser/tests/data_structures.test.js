var Pair = require('../data_structures.js').Pair;
var Nil = require('../data_structures.js').Nil;
var assert = require('assert');

describe("data_structures.js", function() {
    it("test toString", function() {
        var pair = new Pair("1", new Pair(2, new Nil()));
        assert.equal("(cons 1 (cons 2 ()))", pair.toString());
    })
})