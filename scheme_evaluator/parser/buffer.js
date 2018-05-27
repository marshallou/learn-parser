/**
 * We should not design buffer for nodeJS. Because the idea of buffer is to
 * store tokens and supply tokens to parser when needed. To implement method like 
 * "current", "pop" and "hasMore", it requires to buffer to make blocking call
 * to underline io.
 * 
 * But, nodeJS is not designed to be blocking on reading file. 
 * 
 * So as tradeoff, the user of buffer will pass in a callback. The callback
 * will be triggered after buffer has read all lines of the file.
 * 
 * This is not ideal. From performance perspective, the callback should be 
 * triggered once there is token read from file, rather than waiting until 
 * finish reading the whole file.
 * 
 */
var tokenizer = require('./tokenizer.js');

class NoTokenException {
    constructor(message) {
        this.message = message
    }
    
}

class Buffer {
     
    /**
     * @param {readline.Interface} fileSource 
     * @param {function} callback once read all tokens
     * result
     */
     constructor(fileSource, callback,) {
         this.fileSource = fileSource;
         this.callback = callback;
         this.tokens = [];
         this.index = 0;
         this.waitOnReadLines();
     }

     /**
      * when there is line read from source file, tokenize it and add the tokens
      * into 'tokens' array. When reaching end of file, trigger callback with 
      * the Buffer.
      */
     waitOnReadLines() {

        this.fileSource.on('line', function(line) {
            var tokensOfLine = tokenizer.tokenize(line);
            this.tokens = this.tokens.concat(tokensOfLine);
        }.bind(this))

        this.fileSource.on('close', function() {
            this.callback(this);
        }.bind(this))
     }

     /**
      * return true if the buffer contains unpoped token,
      */
     hasMore() {
        return this.current() !== null;
     }

     /**
      * return the current token
      */
     current() {
        if (this.index > this.tokens.length - 1) {
            return null;
        }

        return this.tokens[this.index];
     }

     /**
      * pop the current token
      */
     pop() {
        var current = this.current();

        if (current !== null) {
            this.index++;
        }
        
        return current;
     }

     /**
      * used for testing
      */
     testTokens() {
        return this.tokens;
     }
}

module.exports = {
    Buffer : Buffer,
    NoTokenException : NoTokenException
}