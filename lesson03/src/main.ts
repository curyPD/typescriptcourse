// ARRAYS

let stringArr = ["one", "hey", "Roman"];

let guitars = ["Strat", "Les Paul", 5150];

let mixedData = ["EVH", 1984, true];

// stringArr[0] = 42; // Type "number" is not assignable to type "string"; TypeScript knows the data type of array children - it infers the data type
stringArr[0] = "John";
// stringArr.push(42); // Argument of type "number" is not assignable to parameter of type "string" // TS knows the value type of the array elements, which is string, but we're trying to add a number to the array of strings => TS complains
stringArr.push("hey");

guitars[0] = 1984; // TS doesn't have any problem with this, even though the first element is a string; as long as we assign a string or a number (which are infered types of this array), it's OK
// The length of an array or the order of types in the array doesn't matter to TypeScript
guitars.unshift("Jim");

// stringArr = guitars; // This is unacceptable since we can't assign an array of (string | number)[] to an array of string[]
// guitars = stringArr; // Perfectly valid

let test = [];
let bands: string[] = [];
bands.push("Van Halen");

// Tuple
let myTuple: [string, number, boolean] = ["Roman", 65, false]; // We explicitly defined the length, types, and order of types in the array; It can't have a different structure

let mixed = ["John", 1, false]; // The structure is the same, but it's an array and a union type, not a tuple.

// mixed = myTuple; // valid
// myTuple = mixed; // Target requires 3 element(s) but source may have fewer.
// myTuple[3] = 11; // Type "42" is not assignable to type "undefined"
myTuple[1] = 11; // This is the only index in the tuple that accepts numbers

// OBJECTS

let myObj: object; // the easy way to assign the type of object to variable
myObj = []; // array is also an object => no complaints
console.log(typeof myObj); // object
myObj = bands;
myObj = {};

const exampleObj = {
    prop1: "Roman",
    prop2: true,
};

// exampleObj.prop1 = 1 // Error // TypeScript infers that the value type of prop1 is a string since that's what we assigned to it
// For the keys of exampleObj TypeScript infers the value types, we didn't manually specify those types
// To do it, we would create a type declaration
// type Guitarist = {
//     name: string;
//     active?: boolean; // by putting "?" before type annotation of an object property, we make it OPTIONAL; Now it's a union type (boolean | undefined)
//     albums: (string | number)[];
// };
interface Guitarist {
    name?: string;
    active: boolean;
    albums: (string | number)[];
}
// We can use interface instead of type. We'll get into which one to use and when later

let evh: Guitarist = {
    name: "Eddie",
    active: false,
    albums: [1984, 5150, "OU812"],
};
// Now evh is of a custom type that we defined - Guitarist. It must have all properties with values of the right type that we defined in Guitarist type

let jp: Guitarist = {
    name: "Jimmy",
    active: true, // now that "active" is optional, we can omit it, and still assign jp to evh no problem, because they are both of Guitarist type
    albums: ["I", "II", "IV"],
};
evh = jp;
// let jp = {
//     name: "Jimmy",
//     albums: ["I", "II", "IV"],
// };
// evh = jp; // Property 'active' is missing in type '{ name: string; albums: string[]; }' but required in type 'Guitarist'.

// evh.year = 1984; // Property "year" does not exist on type "Guitarist"

// const greetGuitarist = (guitarist: Guitarist) => {
//     return `Hello ${guitarist.name}!`;
// };

// const greetGuitarist = (guitarist: Guitarist) => {
//     return `Hello ${guitarist.name?.toUpperCase()}!`; // In TypeScript we can't use methods on objects that could possibly be "undefined" (since we made name to be optional). We'd have to use optional chaining
// };
const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`;
    } // narrowing
    return "Hello!";
};

console.log(greetGuitarist(jp));
// TypeScript helps us eliminate errors in development, and not during the runtime

// alt + Z to make long lines fit on the screen

// ENUMS

enum Grade {
    U = 1,
    D,
    C,
    B,
    A,
}

console.log(Grade.U);
