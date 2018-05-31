class Pair {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

Pair.prototype.toString = function() {
    var left = this.left.toString();
    var right = this.right.toString();
    return "(cons " + left + " " + right + ")";
}

class Nil {

}

Nil.prototype.toString = function() {
    return "()";
}

module.exports = {
    Pair : Pair,
    Nil: Nil
}

