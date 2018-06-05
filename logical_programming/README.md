# learn logical programming
## 1 example of running local programming


## 2 Pattern match:
The key part of logical programming is Pattern match. Pattern match is a procedure which takes two inputs: a pattern and rule.
It tests if the elements in pattern match the elements in rule. The basic idea is to keep the matched pattern variables in a data structure
called "Frame". As matching process goes on, adding unbinded pattern variable into the frame while checking if it violates the existing binds

## 2.1 Pattern match algorithms:
Using divide and conquer: decompose the pattern match into smaller problems and recursively solve the smaller problems. 

So if the given pattern is a pattern variable, try bind it into frame by calling 'tryBindPatternVairable'. If the given pattern is not a pattern
variable, but a compound expression, then try to bind the first element of the compound expression and call pattern-match recursively on rest
of the elements.

'tryBindPatternVairable' will try to bind the pattern variable to given rule expression. If rule expression is also a pattern variable and it is binded, 
we need to call 'patternMatch" recursively to solve the problem. Thus, "patternMatch" and "tryBindPatternVariable" are two mutual recursive methods.

## 2.2 bind a variable to a pattern that includes the variable
For example, (?x ?x) -> (?y, (expression involving ?y)). If we try to pattern match this, the final result becomes try to solve the equation
?y = (expression involving ?y). There is no general method for solving it, so  we reject such bindings. The method called "dependOn" will do this check.

On the other hand, (?x ?x) -> (?y ?y) is acceptable