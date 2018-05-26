/**
 * returns: true if the input char is the start of a number
*/
function isNumberStart(c) {
    //regex of matching [0-9]
    var digitsRe = /\d/;

    var signChars = new Set(["+", "-", "."]);
    return digitsRe.test(c) || signChars.has(c);
};

/**
 * @param {string} c 
 * true if it is \"
 */
function isStringStart(c) {
    return c === "\"";
}

/**
 * Whitespace and tab should not be considered as a valid token,
 * they are used as delimiter in expression. So skip them when 
 * searching token start.
 * @param {string} c 
 */
function isSkippedToken(c) {
    var skippedToken = new Set([" ", "\t"]);
    return skippedToken.has(c);
}

/**
 * @param {string} c string with length = 1
 * return: true if the char is single token
 */
function isSingleToken(c) {
    var singleToken = new Set(["(", ")", "'"]);
    return singleToken.has(c);
}

/** 
 * @param {string} c: string with length = 1
 * return true if the char is Token end
 */
function isTokenEnd(c) {
    var tokenEnd = new Set([")", " ", "\t"]);
    return tokenEnd.has(c);
}

/**
 * @param {string} str
 * return true if the str is integer
 */
function isInteger(str) {
    var intRex = /^\d+$/;
    return intRex.test(str);
}

/** 
 * @param {string} str 
 * return true if the str is float
 */
function isFloat(str) {
    var floatRex = /^\d+\.\d+$/;
    return floatRex.test(str);
}

/** 
 * @param {string} c 
 * true if the string is whitespace
 */
function isWhiteSpace(c) {
    return c === " ";
}

/**
 * @param {string} line : given a line
 * return a list of tokens
 */
function tokenize(line) {
    var p1, p2 = 0;
    var len = line.length;
    var tokens  = [];

    while (p2 < len) {
        //generate token starting from p1
        var c = line.charAt(p1);

        if (isSkippedToken(c)) {
            p2++;
            p1 = p2;
        } else if (isSingleToken(c)) {
            //next token is a single char
            p2++;
            p1 = p2;

            tokens.push(c);
        } else if (isNumberStart(c)) {
            //next token is a number
            p2++
            
            while (p2 < len && !isTokenEnd(line.charAt(p2))) {
                p2++;
            }
            
            var token  = line.substring(p1, p2);

            if (isInteger(token)) {
                token = parseInt(token);
            } else if (isFloat(token)) {
                token = parseFloat(token);
            }

            tokens.push(token);
            p1 = p2;
        } else if (isStringStart(c)) {
            //next token is a string
            while (p2 < len && line.charAt(p2) !== "\"") {
                p2++;
            }

            p2++;
            tokens.push(line.substring(p1, p2));
            p1 = p2;
        } else {
            while (p2 < len && !isTokenEnd(line.charAt(p2))) {
                p2++;
            }

            tokens.push(line.substring(p1, p2));
            p1 = p2;
        }
    }
    return tokens;
}

module.exports = {
    isNumberStart: isNumberStart,
    isInteger: isInteger,
    isFloat: isFloat,
    tokenize: tokenize
};


