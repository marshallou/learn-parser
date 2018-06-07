module.exports = class Pattern {
    constructor(exp) {
        this.exp = exp;
    }

    getExp() {
        return this.exp;
    }
    
    firstSymbol() {
        return this.exp.left;
    }
}