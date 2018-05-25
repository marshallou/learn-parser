var tokenizer = require('../parser/tokenizer.js');
var assert = require('assert');

//isNumberStart tests:
describe('Tokenizer.isNumberStart', function() {
        it('3 should be a number start', function() {
            assert.equal(true, tokenizer.isNumberStart("3"));
        })
})

describe('Tokenizer.isNumberStart', function() {
    it('+ should be a number start', function() {
        assert.equal(true, tokenizer.isNumberStart("+"));
    })
})

describe('Tokenizer.isNumberStart', function() {
    it('a should not be a number start', function() {
        assert.equal(false, tokenizer.isNumberStart("a"));
    })
})

//isInteger tests:
describe('Tokenizer.isInteger', function() {
    it('123 should be a integer', function() {
        assert.equal(true, tokenizer.isInteger("123"));
    })
})

describe('Tokenizer.isInteger', function() {
    it('12.3 should not be a integer', function() {
        assert.equal(false, tokenizer.isInteger("12.3"));
    })
})

//isFloat tests:
describe('Tokenizer.isFloat', function() {
    it('12.3 should be a float', function() {
        assert.equal(true, tokenizer.isFloat("12.3"));
    })
})

describe('Tokenizer.isFloat', function() {
    it('1.2.3 should not be a float', function() {
        assert.equal(false, tokenizer.isFloat("1.2.3"));
    })
})

//tokenize tests:
describe('Tokenizer.tokenize', function() {
    it('tokenize test1', function() {
        var line = "(+ 1 (* 2.3 45))";
        var tokens = tokenizer.tokenize(line);
        var expected = ['(', '+', 1, '(', '*', 2.3, 45, ')', ')']
        expected.forEach((token, index) => assert.equal(token, tokens[index]));
    })
})

describe('Tokenizer.tokenize', function() {
    it('tokenize test2', function() {
        var line = "(define (sub-5 x) (+ x -5.3))";
        var tokens = tokenizer.tokenize(line);
        var expected = ['(', 'define', "(", 'sub-5', 'x', ")", "(", "+", 'x', -5.3, ")", ")"];
        expected.forEach((token, index) => assert.equal(token, tokens[index]));
    })
})