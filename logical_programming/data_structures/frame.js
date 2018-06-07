module.exports = class Frame {
    constructor() {
        this.map = new Map();
    }

    setMap(map) {
        this.map = map;
    }

    getMap() {
        return this.map;
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

    //create a new frame which copies everything in current frame
    copy() {
        var coppiedMap = new Map();
        this.map.forEach((value, key) => {
            coppiedMap.set(key, value);
        });
        var coppiedFrame = new Frame();
        coppiedFrame.setMap(coppiedMap);

        return coppiedFrame;
    }
}