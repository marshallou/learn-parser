var PatternMatcher = require("../pattern_matcher.js");
var Pair = require("../../simple_parser/data_structures.js").Pair;
var Nil = require("../../simple_parser/data_structures.js").Nil;
var Rule = require("../data_structures/rule.js");
var Frame = require("../data_structures/frame.js");
var assert = require("assert");

//(rule (hello 2))
var rule1 = new Rule(new Pair("rule", new Pair(new Pair("hello", new Pair("2", new Nil())), new Nil())));

//(rule (hello ?x ?y))
var rule2 = new Rule(new Pair("rule", 
    new Pair(new Pair("hello", new Pair("2", new Pair("3", new Nil))), new Nil())));

describe("pattern match test1", function() {
    it("(rule (hello 2)) and pattern: (?x ?y): ", function() {
        //(x y)
        var pattern = new Pair("?x", new Pair("?y", new Nil()));
        var frame = new Frame();
        PatternMatcher.patternMatch(pattern, rule1.ruleConclusion(), frame);
        assert.equal(frame.getBind("?x"), "hello");
    })
})

describe("pattern match test1", function() {
    it("rule1 and pattern1: ", function() {
        var pattern = new Pair("?x", "?y");
        var frame = new Frame();
        PatternMatcher.patternMatch(pattern, rule2.ruleConclusion(), frame);
        assert.equal(frame.getBind("?y").left, "2");
        assert.equal(frame.getBind("?y").right.left, "3");
    })
})