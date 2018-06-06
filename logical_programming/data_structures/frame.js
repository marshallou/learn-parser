module.exports = class Frame {
    constructor() {
        this.map = new Map();
    }

getBind(patternVar) {
        return this.map.get(patternVar);
    }

    has(patternVar) {
        return this.map.has(patternVar);
    }

    setBind(patternVar, value) {
        return this.map.set(patternVar, value);
    }
}