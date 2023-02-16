let myName: string = "Roman";
let meaningOfLife: number;
let isLoading: boolean;
let album: any; // "any" type; TypeScript will be fine with whatever value type we assign to it; defeats the purpose of TypeScript, but is not useless
// let album: string | number; // union type for variables that could be of various types

myName = "Jonas";
meaningOfLife = 42;
isLoading = true;
album = 1984;

const sum = (a: number, b: string) => {
    return a + b;
};

let postId: string | number; // We could receive id's as string from an API, but use them as numbers in our code
let isActive: number | boolean; // We can chain more types if want

let re: RegExp = /\w+/g; // RegExp is also a valid type in TS
