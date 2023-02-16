"use strict";
let username = "Roman";
console.log(username);
// "tsc filename.ts filename.js" to compile typescript to javascript; compiles to versions parsable by older browsers, therefore "var"
// To recompile on every change run "tsc filename.ts -w"
// tsconfig.json to configure TS options. Specified rootDir and outDir
// "tsc -w" to automatically compile all ts files in rootDir into outDir
// Add "include" array to config to specify what files to compile
let a = 12;
// let b: string = "6";
let b = 6; // Valid JS = valid TS, but it doesn't mean the TS compiler will like our code
let c = 2;
console.log(a / b); // We're dividing number by string but still this is valid JavaScript because of the type coercion
console.log(c * b); // TypeScript is complaining, but still it compiles to JS
// "noEmitOnError: true" setting allows us to prevent compilation if any type checking error is reported
// "tsc --noEmitOnError -w" to do the same thing, but it overrides the config
