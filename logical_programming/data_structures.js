/**
 * data structures: assertion and rule
 * 
 * 1.assertion: 
 * (job Yiqi SDE)
 * (address Yiqi Seattle)
 * 
 * 2.rule: 
 * 
 * (rule (live-near ?person-1 ?persion-2)
 *          (and (address ?person-1 ?same-address)
 *               (address ?person-2 ?same-address)
 *               (not (same ?person-1 ?person-2))))
 *   
 * (rule (same ?x ?x))
 */

/**
 * return true if exp is a rule
 */
function isRule(exp) {
    return exp.left == "rule";
}

/**
 * return name of the rule
 * @param {Pair} exp
 */
function getRuleName(exp) {
    return exp.right.left.left;
}

function getRuleBody(exp) {
    return exp.right.right;
}

function isAssertion(exp) {
   return !isRule(exp);
}

module.exports = {
    isRule: isRule,
    getRuleName: getRuleName,
    getRuleBody: getRuleBody,
    isAssertion: isAssertion
}


