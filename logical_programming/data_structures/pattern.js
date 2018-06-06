module.exports = class Pattern {
    constructor(exp) {
        this.exp = exp;
    }

    exp() {
        return this.exp;
    }
    
    firstSymbol() {
        return this.exp.left;
    }
}