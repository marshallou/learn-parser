var tokenizer = require('../tokenizer.js');
var assert = require('assert');

describe('Tokenizer.js', function() {
    describe('isNumberStart', function() {
        it('3 should be a number start', function() {
            assert.equal(true, tokenizer.isNumberStart("3"));
        })
    })
});