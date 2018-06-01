module.exports = class Pattern {
    constructor(exp) {
        this.exp = exp;
    }

    firstSymbol() {
        return this.exp.left;
    }
}