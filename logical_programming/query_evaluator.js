var patternMatcher = require("./pattern_matcher.js");
var Frame = require("./data_structures/frame.js");
var Nil = require("../simple_parser/data_structures.js").Nil;
var Pair = require("../simple_parser/data_structures.js").Pair;
var Pattern = require("./data_structures/pattern.js");

function eval(pattern, rules, frame) {
    var i;

    for (i = 0; i < rules.length; i++) {
        var cleanRule = patternMatcher.cleanRule(rules[i]);
        var coppiedFrame = frame.copy();

        if (patternMatcher.unification(pattern, cleanRule, coppiedFrame)) {
            frame.setMap(coppiedFrame.getMap());
            
            //base case: rule body is empty
            if (cleanRule.ruleBody() instanceof Nil) {
                return;
            } else {    
                //rule body has () outside, call left to retrieve the exp
                return eval(new Pattern(cleanRule.ruleBody().left), rules, frame);
            }
        } 
    }
}

function instantiatePattern(pattern, frame) {
    if (!patternMatcher.isPair(pattern)) {
        if (patternMatcher.isSymbol(pattern) || (patternMatcher.isPatternVariable(pattern) && !frame.has(pattern))) {
            return pattern;
        } else {
            return instantiatePattern(frame.getBind(pattern), frame);
        }
        
    } else {
        return new Pair(instantiatePattern(pattern.left, frame), instantiatePattern(pattern.right, frame));
    }
}

module.exports = {
    eval: eval,
    instantiatePattern: instantiatePattern
}