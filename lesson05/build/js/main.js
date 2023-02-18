"use strict";
// convert to more or less specific
let a = "hello";
let b = a; // less specific
let c = a; // more specific
let d = "world"; // different syntax for type annotation
let e = "world";
// ❕ In tsx the cannot use this <> syntax
const addOrConcat = (a, b, c) => {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b;
};
// let myVal: string = addOrConcat(2, 2, "concat") // addOrConcat can return string | number, but we expext myVal to be a string // we get an error // we can fix this with an ASSERTION
let myVal = addOrConcat(2, 2, "concat"); // Now we have told TypeScript through assertion that addOrConcat will return a string in this case // We're letting TS know that we know better what value type to expect
// Be careful! TS sees no problem - but a string is returned
let nextVal = addOrConcat(2, 2, "concat");
// We should be careful with assertions when telling TS that we know better than it - there's a chance we can make a mistake
// 10 as string
10; // double casting (double assertion) // not recommented to do as a beginner because this basically overrules TypeScript // Use unknown and any as rarely as possible
// The DOM
// const img = document.getElementById("img"); // TS infers that img is an html element, but it also can be null
// const myImg = document.querySelector("img"); // now TS sees that we're being more specific and infers the HTMLImageElement type (or null, again)
const img = document.querySelector("img"); // We know for sure that we added an <img /> in our HTML, which TS has no idea about, and this is where assertion is very handy; we know better than TypeScript what type this value is
const myImg = document.getElementById("img");
const nextImg = document.getElementById("img");
// img.src;
// myImg.src; // two problems here: 1) myImg is possibly null; 2) property "src" does not exist on HTMLElement
// To convince TS that we know for sure this is not null, we can put "!" at the end of assignment; this is called NON NULL ASSERTION
// It makes sense to use non null assertion for img instead since TS already infered that it's HTMLImageElement, and all we need to do is to tell TS that it's not null
// On the other hand, we don't have to use both "!" and "as ..." on myImg, since "as ..." implies that this has a specific type
