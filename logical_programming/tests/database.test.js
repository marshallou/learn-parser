var Rule = require("../data_structures/rule.js");
var Assertion = require("../data_structures/assertion.js");
var Pair = require("../../simple_parser/data_structures.js").Pair;
var Nil = require("../../simple_parser/data_structures.js").Nil;
var Database = require("../database.js");
var assert = require("assert");

var ruleExp1 = new Pair("rule", new Pair(new Pair("a", new Nil()), new Nil()));
var ruleExp2 = new Pair("rule", new Pair(new Pair("b", new Nil()), new Nil()));
var ruleExp3 = new Pair("rule", new Pair(new Pair("?x", new Nil()), new Nil()));
var assertExp1 = new Pair("job", "SDE");

var rule1 = new Rule(ruleExp1);
var rule2 = new Rule(ruleExp2);
var rule3 = new Rule(ruleExp3);
var assertion1 = new Assertion(assertExp1);
var db = new Database();

db.addRule(rule1);
db.addRule(rule2);
db.addRule(rule3);
db.addAssertion(assertion1);

describe("test database add rules and assertions", function() {
    it("rule and assertion should be added successfully", function() {
        assert.equal(rule1, db.ruleMap.get("a")[0]);
        assert.equal(rule2, db.ruleMap.get("b")[0]);
        assert.equal(rule3, db.ruleMap.get("?")[0]);
        assert.equal(assertion1, db.assertionMap.get("job")[0]);
    })
})
