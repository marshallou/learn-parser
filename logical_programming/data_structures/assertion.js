module.exports = class Assertion {
    constructor(exp) {
        this.exp = exp;
    }

    assertName() {
        return this.exp.left;
    }
}