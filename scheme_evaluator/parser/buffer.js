/**
 * buffer takes a list of list of tokens. i.e [[tok1, tok2], [tok3, tok4]].
 * it has three public methods: 
 * current,
 * next,
 * hasMore
 * 
 * buffer should be able to handle [[tok1, tok2], [], [tok3, tok4]]
 */

 module.exports = class Buffer {
     constructor(tokenList) {
         this.tokenList = tokenList;
         this.row = 0;
         this.col = 0;
     }

     /**
      * return true if the buffer contains unpoped token,
      * Note: should ca
      */
     hasMore() {
        return this.current() !== null;
     }

     /**
      * return the current token
      */
     current() {
        if (this.row > this.tokenList.length - 1) {
            return null;
        }

        if (this.col > this.tokenList[this.row].length - 1) {
            //this list has no token any more, search next list
            this.row++;
            this.col = 0;
            return this.current();
        }

        return this.tokenList[this.row][this.col];
     }

     /**
      * pop the current token
      */
     pop() {
        var current = this.current();
        this.col++;
        return current;
     }
 }