var Pair = require("../simple_parser/data_structures.js").Pair;
var Nil = require("../simple_parser/data_structures.js").Nil;
var Frame = require("./data_structures/frame.js");
var Rule = require("./data_structures/rule.js");

function isPair(exp) {
    return exp instanceof Pair;
}

function isPatternVariable(exp) {
    return typeof exp === "string" && exp.startsWith("?");
}

function isSymbol(exp) {
    return (typeof exp === "string" && !exp.startsWith("?")) || exp instanceof Nil;
}

/**
 * test if the symbols are equal:
 * 1) exp1 = ?x, exp2 = ?x
 * 2) exp1 = "hello", exp2 = "hello"
 * 3) exp1 = Nil, exp2 = Nil
 * @param {symbol} exp1 
 * @param {symbol} exp2 
 */
function isPatternEqual(exp1, exp2) {
    return exp1 === exp2 || (exp1 instanceof Nil && exp2 instanceof Nil);
}

var id = 0;

/**
 * append each pattern variable in rule with id. Each time before we call this method, 
 * we need to add 1 to id to make sure the id is always unique
 * @param {exp} exp 
 */
function getCleanRuleExp(exp) {

    if (isPatternVariable(exp)) {
        return exp + "-" + id;
    } else if (isPair(exp)) {
        return new Pair(getCleanRuleExp(exp.left), getCleanRuleExp(exp.right));
    }

    return exp;
}

function cleanRule(rule) {
    id++;
    return new Rule(getCleanRuleExp(rule.getExp()));
}

function unification(pattern, rule, frame) {
    return patternMatch(pattern.getExp(), rule.ruleConclusion(), frame);
}

/**
 * returns true if the pattern match and modify the frame which binds the pattern variable properly
 * @param {pattern} patternExpression 
 * @param {rule} ruleExpression
 * @param {frame} frame 
 */
function patternMatch(pattern, rule, frame) {
    if (isPatternEqual(pattern, rule)) {
        return true;
    } else if (isPatternVariable(pattern)) {
        return tryBind(pattern, rule, frame);
    } else if (isPatternVariable(rule)) {
        return tryBind(rule, pattern, frame);
    } else if (isPair(pattern) && isPair(rule)) {
        var leftRes = patternMatch(pattern.left, rule.left, frame);
        
        if (leftRes) {
            return patternMatch(pattern.right, rule.right, frame);
        }
    }

    return false;
}

function tryBind(patternVar, exp, frame) {
    if (frame.has(patternVar)) {
        return patternMatch(frame.getBind(patternVar), exp, frame);
    } else if (isPatternVariable(exp)) {
        if (frame.has(exp)) {
            return patternMatch(patternVar, frame.getBind(exp), frame);
        }
        frame.setBind(patternVar, exp);
        return true;
    } else if (isPair(exp) && dependsOn(patternVar, exp, frame)) {
        return false;
    } else {
        //patternVar is ?x, exp is string or a non-dependent Pair
        frame.setBind(patternVar, exp);
        return true;
    }
}

function dependsOn(patternVar, exp, frame) {
    if (isSymbol(exp)) {
        return false;
    } else if (isPatternVariable(exp)) {
        if (isPatternEqual(patternVar, exp)) {
            return true;
        }

        if (frame.has(exp)) {
            return dependsOn(patternVar, frame.getBind(exp), frame);
        }

        return false;
    } else {
        //if exp is pair
        return dependsOn(patternVar, exp.left, frame) 
            || dependsOn(patternVar, exp.right, frame);
    }
}

module.exports = {
    patternMatch: patternMatch,
    unification: unification,
    cleanRule: cleanRule,
    isPatternVariable: isPatternVariable,
    isPair: isPair,
    isSymbol: isSymbol
}