var Buffer = require('../buffer.js').Buffer;
var Parser = require('../parser.js');
var assert = require('assert');

//config readlineStream
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "parser.test.txt");
const readlineStream = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

function assertExpressions(exps) {
    describe("Parser.js", function() {
        it("test parser", function() {
            assert.equal(3, exps.length);

            assert.equal(
                "(cons 1 (cons (cons 2 (cons 3 (cons 4 ()))) (cons (cons 5 (cons (cons 6 (cons 7 ())) (cons 8 ()))) (cons 9 ()))))",
                exps[0].toString()
            );

            assert.equal(
                "(cons define2 (cons (cons eval2 ()) ()))",
                exps[1].toString()
            );

            assert.equal(
                "(cons define (cons (cons eval ()) (cons 123 ())))",
                exps[2].toString()
            );
        })
    })
}

new Parser(readlineStream, assertExpressions);
    
