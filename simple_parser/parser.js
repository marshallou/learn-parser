var Buffer = require('./buffer.js').Buffer;
var NoTokenException = require('./buffer.js').NoTokenException;
var Pair = require('./data_structures.js').Pair;
var Nil = require('./data_structures.js').Nil;

/**
 * parse a single expression from token stream of buffer
 * @param {buffer} buffer 
 * invariant: when start, buffer points to the start of current
 * expression. After executing, it returns the current expression
 * and buffer points to the start of next expression.
 */
function parseExpression(buffer) {

    if (buffer.hasMore()) {
        var token = buffer.pop();

        if (token === "(") {
            return parseCompoundExpression(buffer);
        } else {
            return token;
        }
    }

    throw new NoTokenException("no token when calling parseException");
}

/**
 * parse a compound expression from token stream of buffer
 * @param {buffer} buffer 
 * invariant: When start, buffer points to the first element of compound
 * expression. After executing, it returns the compound expression and 
 * buffer points to the start of next expression.
 */
function parseCompoundExpression(buffer) {

    if (buffer.hasMore()) {
        var token = buffer.current();
        var left;

        if (token === ")") {
            buffer.pop();
            return new Nil();
        } else if (token === "(") {
            left = parseExpression(buffer);
        } else {
            left = token;
            buffer.pop();
        }
        var right = parseCompoundExpression(buffer);
        return new Pair(left, right);
    }

    throw new NoTokenException("no token when calling parseCompoundException");
}

module.exports = class Parser {

    /**
     * given the source file and function to evaluate expression,
     * parser will parse the source file and call eval with parsed expression
     * @param {readline.Interface} readlineStream 
     * @param {function} evalExpressions
     */
    constructor(readlineStream, evalExpressions) {
        this.readlineStream = readlineStream;
        this.evalExpressions = evalExpressions
        this.init();
    }

    init() {
        new Buffer(this.readlineStream, this.parse.bind(this));
    }

    /**
     * given the buffer, parse all its tokens into expressions.
     * @param {Buffer} buffer 
     */
    parse(buffer) {
        var expressions = [];
    
        try {
            var expression = parseExpression(buffer);

            while (expression) {
                expressions.push(expression);
                expression = parseExpression(buffer);
            }
        } catch (e) {
            if (e instanceof NoTokenException 
                && expressions.length !== 0) {
                //if read alll tokens and still not get an complete
                //expression, it means missing parenthesis.
                this.evalExpressions(expressions);
            } else {
                throw e;
            }
        }
    }
}

