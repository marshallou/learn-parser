var Parser = require("../../simple_parser/parser.js");
var Rule = require("../data_structures/rule.js");

var assert = require('assert');

//config readlineStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "rule.test.txt");
const readlineStream = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

function assertExpressions(exps) {
    describe("Parser.js", function() {
        it("test parser", function() {
            assert.equal(1, exps.length);
            var exp = exps[0];
            assert.equal(true, Rule.isRule(exp));
            
            var rule = new Rule(exp);
            assert.equal("live-near", rule.ruleName());
            assert.equal("and", rule.ruleBody().left.left);
        })
    })
}

new Parser(readlineStream, assertExpressions);
