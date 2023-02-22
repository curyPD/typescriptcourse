// Generics allow us to provide a placeholder (type variable (or type parameter)) when we don't know what type something is going to be
// const stringEcho = (arg: string): string => arg; // let's say we wanted this function to be more generic - not only for strings

const echo = <T>(arg: T): T => arg; // This is the syntax for Generics // Now this function works for any argument type // T is a type parameter // We could put any name instead of T, but it's the most common type parameter name

// This feature is useful in utility functions
const isObj = <T>(arg: T): boolean => {
    return typeof arg === "object" && !Array.isArray(arg) && arg !== null; // typeof null is also "object"
};

console.log(isObj(true));
console.log(isObj("John"));
console.log(isObj([1, 2, 3]));
console.log(isObj({ name: "Roman" }));
console.log(isObj(null));

// One good sign that you need a generic is when a function has to do some logic, some thinking about what it needs to return

const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    } // we want isTrue to return false if it recieves an empty array or object
    // if (isObj(arg) && !Object.keys(arg).length) { // TypeScript doesn't know whether or not arg is an object for us to be able to pass it into Object.keys, so we have to use typeof assertion
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        // Now we're basically telling TS that arg is of type T which is an object
        // Guess #2: arg is of type T, right? Object.keys wants to know if that T type is an object. And apparently by using keyof T, we're telling Object.keys that T is an object. arg is still of type T, its value doesn't change, just like its type, they stay the same
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
// Two things to take away from this: we were able to call the function with any type we could think of, AND not only did we use T in function parameters and return type, but in the function body too

// We could define the return value type with an interface and see how to use interfaces with type parameters while we're at it

interface BoolCheck<T> {
    value: T; // T here doesn't have to match T in checkBoolValue, it's like a function parameter
    is: boolean;
}

const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { value: arg, is: false };
    }
    return { value: arg, is: !!arg };
};

interface HasId {
    id: number;
}

const processUser = <T extends HasId>(user: T): T => {
    // Now we're narrowing T generic type - user will have to have id property

    // ...process the user logic here...
    return user;
};

console.log(processUser({ id: 1, name: "Roman" }));
// console.log(processUser({ name: "Roman" })); // must have id

// Are you ready?
const getUsersProperty = <T extends HasId, K extends keyof T>(
    users: T[],
    key: K
): T[K][] => {
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

class StateObject<T> {
    private data: T;

    constructor(value: T) {
        this.data = value;
    }

    get state(): T {
        return this.data;
    }

    set state(value: T) {
        this.data = value;
    }
}

const store = new StateObject("John");
// const store = new StateObject<string>("John"); // hover over StateObject // we can manually assign the type
console.log(store.state);
store.state = "Roman";
// store.state = 12 // no no

const myState = new StateObject<(string | number | boolean)[]>([
    "Roman",
    16,
    false,
]);
console.log(myState.state);
