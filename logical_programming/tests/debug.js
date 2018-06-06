var Rule = require("../data_structures/rule.js");
var Frame = require("../data_structures/frame.js");
var Pair = require("../../simple_parser/data_structures.js").Pair;
var Nil = require("../../simple_parser/data_structures.js").Nil;
var Database = require("../database.js");
var PatternMatcher = require("../pattern_matcher.js");
var Parser = require("../../simple_parser/parser.js");
var Pattern = require("../data_structures/pattern.js");

//config readlineStream to read rules
const readline = require('readline')
const fs = require('fs')
var path = require('path')
var testFilePath = path.join(__dirname, "debug.rules.test.txt");
const ruleStream = readline.createInterface({
    input: fs.createReadStream(testFilePath, 'utf8')
})

var db = new Database();

//add rules into database
function addParsedExpressionIntoDatabase(expressions) {
    expressions.forEach(ruleExp => {
        db.addRule(new Rule(ruleExp));
    });

    readPattern();
}

new Parser(ruleStream, addParsedExpressionIntoDatabase);


function readPattern() {
    var testFilePath = path.join(__dirname, "debug.pattern.test.txt");
    const patternStream = readline.createInterface({
        input: fs.createReadStream(testFilePath, 'utf8')
    })

    function evalPattern(expressions) {
        var pattern = new Pattern(expressions[0]);
        var rules = db.findRules(pattern);
        console.log(pattern);
    }
    new Parser(patternStream, evalPattern);
}
