/**
 * (rule (live-near ?person-1 ?persion-2)
 *          (and (address ?person-1 ?same-address)
 *               (address ?person-2 ?same-address)
 *               (not (same ?person-1 ?person-2))))
 *   
 * (rule (same ?x ?x))
 */
module.exports = class Rule {
    constructor(exp) {
        if (!Rule.isRule(exp)) {
            throw new Error("Failed creating Rule, the exp passed" + 
                " in constuctor is not an 'rule' expression");
        }

        this.exp = exp;
    }

    exp() {
        return this.exp;
    }

    ruleConclusion() {
        return this.exp.right.left;
    }

    ruleName() {
        return this.exp.right.left.left;
    }

    ruleBody() {
        return this.exp.right.right;
    }

    static isRule(exp) {
        return exp.left == 'rule';
    }
}

