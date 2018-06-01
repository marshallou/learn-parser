/**
 * The database stores both assertions and rules.
 * 
 * They are stored in two different maps: assertionMap and ruleMap:
 * 1)assertionMap's key is assertion name, the value is a list of assertions
 * 2)ruleMap's key is rule name, the value is a list of rules. If the rule name
 * is a variable, it will be indexed by "?"
 */
module.exports = class Database {
    constructor() {
        this.assertionMap = new Map();
        this.ruleMap = new Map();
        this.ruleMap.set("?", []);
    }

    addAssertion(assertion) {
        var assertionName = assertion.assertName();
        var assertions = this.assertionMap.get(assertionName);

        if (assertions === undefined) {
            assertions = [assertion];
            this.assertionMap.set(assertionName, assertions);
        } else {
            assertions.push(assertion);
        }
    }

    addRule(rule) {
        var ruleName = rule.ruleName();
        var rules = [];

        if (ruleName.startsWith("?")) {
            rules = this.ruleMap.get("?");
        } else if (this.ruleMap.get(ruleName) !== undefined) {
            rules = this.ruleMap.get(ruleName);
        } else {
            this.ruleMap.set(ruleName, rules);
        }
        rules.push(rule);
    }

    /**
     * given a pattern find assertion candidates which may have a match
     * @param {Pattern} pattern 
     */
    findAssertions(pattern) {
        return this.assertionMap.get(pattern.firstSymbol);
    }

    /**
     * given a pattern find rule condidates which may have a match.
     * rules starting with variable like "?x" should always be a candidate
     * @param {Pattern} pattern 
     */
    findRules(pattern) {
        return this.ruleMap.get(pattern.firstSymbol)
            .concat(this.ruleMap.get("?"));
    }
}