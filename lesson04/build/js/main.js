"use strict";
// interface PostId = stringOrNumber; // Interfaces cannot do this
// LITERAL TYPE
let myName; // litaral assignment
// myName = "Roma" // doesn't work
let userName; // union type
userName = "Amy";
// We might have a variable where only certain values are expected, that's where this literal assignment could come in handy
// FUNCTIONS
// const add = (a, b) => {
//     return a + b;
// }; // TypeScript infers the type of parameters and return value; however it doesn't like what it sees; we get an error
const add = (a, b) => {
    return a + b;
}; // Now we explicitly define the type of parameters and return value
const logMsg = (message) => {
    console.log(message);
}; // For functions that don't return and only produce side effects like this one, we set the return value type to void (returns nothing)
logMsg("Hello!");
logMsg(add(2, 3));
// logMsg(add("a", 3)); // Argument of type "string" is not assignable to parameter of type "number"
let subtract = function (c, d) {
    return c - d;
};
// We can use an interface instead of type alias
// interface mathFunction {
//     (a: number, b: number): number;
// }
// Interfaces seem to be more suitable to be used like classes that can be extended (we'll learn more anout that later)
// Type aliases are more suitable for things like functions and primitive types
let multiply = function (c, d) {
    return c * d;
}; // We assigned the type alias mathFunction to the multiply variable
logMsg(multiply(2, 2));
// OPTIONAL PARAMETERS
const addAll = (a, b, c) => {
    if (typeof c !== "undefined") {
        return a + b + c; // type guard
    }
    return a + b; // in case c IS indefined, we still have to return something that's a number; otherwise we'd have to specify that return value can be undefined as well
};
// ❕ Optional parameters must come at the end; first we put all required parameters
// DEFAULT PARAM VALUE
const sumAll = (a = 10, b, c = 2) => {
    return a + b + c;
};
logMsg(addAll(2, 3, 2));
logMsg(addAll(2, 3));
logMsg(sumAll(undefined, 3));
// ❕ Unlike with optional parameters, we can give a default value not only to the last parameter; Say we give a default value to a, and to call this function so that that defaukt vakue is used, we'd have to pass undefined as the first argument
// ❕ Default values can't be used in function signatures (type aliases) like mathFunction
// REST PARAMETERS
const total = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr, 0);
}; // We didn't assign any type to reduce callback parameters because TS can easily infer the type of those values from what we specified in the total function
logMsg(total(1, 2, 3, 4));
// NEVER TYPE
const createError = (errMsg) => {
    throw new Error(errMsg);
}; // a function returns never type if it explicitly throws
// functions also return a neveer type if there's an infinite loop inside them
// if we see that the return value type of a function is infered as never, we should throw, otherwise we might have a problem (like an endless loop)
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break; // this is a way to fix the function; now its return value type is void
    }
};
const isNumber = (value) => {
    return typeof value === "number" ? true : false;
}; // custom type guard
const numberOrString = (value) => {
    if (typeof value === "string")
        return "string";
    if (isNumber(value))
        return "number";
    // Function lacks ending return statement and return type does not include 'undefined'
    // Even though the only types accepted by the function are string and number, which our type guard already covers, TypeScript still needs a return statement, even if it should NEVER happen:
    return createError("This should never happen!");
}; // use of the never type
