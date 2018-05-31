var Parser = require("../../simple_parser/parser.js");
var DataUtils = require("../data_structures.js");

var assert = require('assert');

//config readlineStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "data_structures.test.txt");
const readlineStream = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

function assertExpressions(exps) {
    describe("Parser.js", function() {
        it("test parser", function() {
            assert.equal(1, exps.length);
            var exp = exps[0];
            assert.equal(true, DataUtils.isRule(exp));
            assert.equal("live-near", DataUtils.getRuleName(exp));
            assert.equal("and", DataUtils.getRuleBody(exp).left.left);
        })
    })
}

new Parser(readlineStream, assertExpressions);
