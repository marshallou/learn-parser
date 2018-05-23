/**
 * returns: true if the input char is the start of a number
*/
function isNumberStart(c) {
    //regex of matching [0-9]
    var digitsRe = /\d/;

    var signChars = new Set(["+", "-", "."]);
    return digitsRe.test(c) || signChars.has(c);
};

module.exports = {
    isNumberStart: isNumberStart
};


