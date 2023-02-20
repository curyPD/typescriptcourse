"use strict";
// Generics allow us to provide a placeholder (type variable (or type parameter)) when we don't know what type something is going to be
// const stringExho = (arg: string): string => arg; // let's say we wanted this function to be more generic - not only for strings
const echo = (arg) => arg; // This is the syntax for Generics // Now this function works for any argument type // T is a type parameter // We could put any name instead of T, but it's the most common type parameter name
// This feature is useful in utility functions
const isObj = (arg) => {
    return typeof arg === "object" && !Array.isArray(arg) && arg !== null; // typeof null is also "object"
};
console.log(isObj(true));
console.log(isObj("John"));
console.log(isObj([1, 2, 3]));
console.log(isObj({ name: "Roman" }));
console.log(isObj(null));
// One good sign that you need a generic is when a function has to do some logic, some thinking about what it needs to return
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    } // we want isTrue to return false if it reecives an empty array or object
    // if (isObj(arg) && !Object.keys(arg).length) { // TypeScript doesn't know whether or not arg is an object for us to be able to pass it into Object.keys, so we have to use typeof assertion
    if (isObj(arg) && !Object.keys(arg).length) {
        // Now we're basically telling TS that arg is of type T which is an object
        return { arg, is: false };
    }
    return { arg, is: !!arg };
};
console.log(isTrue(false));
console.log(isTrue(0));
console.log(isTrue(12));
console.log(isTrue(true));
console.log(isTrue("Roman"));
console.log(isTrue(""));
console.log(isTrue({})); // modified
console.log(isTrue({ name: "Roman" }));
console.log(isTrue([])); // modified
console.log(isTrue([1, 2, 3, 4, "Hey"]));
console.log(isTrue(NaN));
console.log(isTrue(undefined));
console.log(isTrue(null));
const checkBoolValue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) {
        return { value: arg, is: false };
    }
    return { value: arg, is: !!arg };
};
const processUser = (user) => {
    // Now we're narrowing T generic type - user will have to have id property
    // ...process the user logic here...
    return user;
};
console.log(processUser({ id: 1, name: "Roman" }));
// console.log(processUser({ name: "Roman" })); // must have id
// Are you ready?
const getUsersProperty = (users, key) => {
    return users.map((user) => user[key]);
};
// T is an object that has an id
// K is a key of the T object
const usersArray = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496",
            },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
        },
    },
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
                lat: "-43.9509",
                lng: "-34.4618",
            },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
        },
    },
];
console.log(getUsersProperty(usersArray, "email"));
console.log(getUsersProperty(usersArray, "name"));
// GENERICS WITH CLASSES
class StateObject {
    constructor(value) {
        this.data = value;
    }
    get state() {
        return this.data;
    }
    set state(value) {
        this.data = value;
    }
}
const store = new StateObject("John");
// const store = new StateObject<string>("John"); // hover over StateObject // we can manually assign the type
console.log(store.state);
store.state = "Roman";
// store.state = 12 // no no
const myState = new StateObject([
    "Roman",
    16,
    false,
]);
console.log(myState.state);
