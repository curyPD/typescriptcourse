"use strict";
let myName = "Roman";
let meaningOfLife;
let isLoading;
let album; // "any" type; TypeScript will be fine with whatever value type we assign to it; defeats the purpose of TypeScript, but is not useless
// let album: string | number; // union type for variables that could be of various types
myName = "Jonas";
meaningOfLife = 42;
isLoading = true;
album = 1984;
const sum = (a, b) => {
    return a + b;
};
let postId; // We could receive id's as string from an API, but use them as numbers in our code
let isActive; // We can chain more types if want
let re = /\w+/g; // RegExp is also a valid type in TS
