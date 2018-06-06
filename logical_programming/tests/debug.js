var Rule = require("../data_structures/rule.js");
var Frame = require("../data_structures/frame.js");
var Pair = require("../../simple_parser/data_structures.js").Pair;
var Nil = require("../../simple_parser/data_structures.js").Nil;
var Database = require("../database.js");
var PatternMatcher = require("../pattern_matcher.js");

//(rule (hello 2))
var rule1 = new Rule(new Pair("rule", new Pair(new Pair("hello", new Pair("2", new Nil())), new Nil())));

//(rule (hello ?x ?y))
var rule2 = new Rule(new Pair("rule", 
    new Pair(new Pair("hello", new Pair("?x", new Pair("?y", new Nil))), new Nil())));

//(x y)
var pattern1 = new Pair("?x", new Pair("?y", new Nil()));
var frame1 = new Frame();
PatternMatcher.patternMatch(pattern1, rule1.ruleConclusion(), frame1);
console.log(frame1.map);

var pattern2 = new Pair("?x", "?y");
var frame2 = new Frame();
PatternMatcher.patternMatch(pattern2, rule1.ruleConclusion(), frame2);
console.log(frame2);

var pattern3 = new Pair("hello", new Pair("?x", new Pair("?y", new Nil)));
var frame3 = new Frame();
PatternMatcher.patternMatch(pattern3, rule2.ruleConclusion(), frame3);
console.log(frame3);