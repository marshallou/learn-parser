var Buffer = require('./buffer.js').Buffer;
var NoTokenException = require('./buffer.js').NoTokenException;
var Pair = require('./data_structures.js').Pair;
var Nil = require('./data_structures.js').Nil;

/**
 * parse a single expression from token stream of buffer
 * @param {Buffer} buffer 
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
 * @param {Buffer} buffer 
 */
function parseCompoundExpression(buffer) {

    if (buffer.hasMore()) {
        var token = buffer.pop();
        var left;

        if (token === ")") {
            return new Nil();
        } else if (token === "(") {
            left = parseExpression();
        } else {
            left = token;
        }
        var right = parseCompoundExpression();
        return new Pair(left, right);
    }

    throw new NoTokenException("no token when calling parseCompoundException");
}

module.export = class Parser {

    /**
     * given the source file and function to evaluate expression,
     * parser will parse the source file and call eval with parsed expression
     * @param {readline.Interface} fileSource 
     * @param {function} evalExpressions
     */
    constructor(fileSource, evalExpressions) {
        this.evalExpressions = evalExpressions
        this.fileSource = fileSource;
        this.init();
    }

    init() {
        new Buffer(this.fileSource, this.parse.bind(this));
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
            }
        } catch (e) {
            if (e instanceof NoTokenException) {
                this.evalExpressions(expressions);
            }

            throw e;
        }
    }
}

