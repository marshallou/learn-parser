# Learn Parser

## 1. simple_parser
The parser will take scheme expression, tokenize it and transform tokens into internal data structure: Pair.. 

Details can be found: 
[simple-parser](https://github.com/marshallou/learn-parser/tree/master/simple_parser)

## 2. logical_programming
logical programming is programming style which is different from normal programming style. Normal programming gives step by step procedure to interpretor/compiler and interpretor will execute those instructions to compute result. But logical programming does not care "how" the result is computed. It just describes what it compute. We call the thing to  be computed a "query".

Logical programming will store a list of rules in database to initialize the system. Having the rules, logical interpretor is able to apply mathematical deduction to compute the result. The process is similar to evaluator: Given a "query", the logical interpreator will try to find a matched rule. If the rule is an assertion (basic rul), it returns the assertion. If the rule is a compound rule, it decomposite the rule and continue searching a match rule recursively until the problem has been solved.

Details can be found: 
[logical-programming](https://github.com/marshallou/learn-parser/tree/master/logical_programming)