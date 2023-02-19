"use strict";
class Coder {
    // name: string; // we need a property to be defined both as a member outside of constructor, and inside of the constructor
    // music: string;
    // age: number;
    // lang: string;
    // There's a way to avoid TS alert when defining members by using assertions
    // secondLang!: string // As a beginner, stay away from this
    constructor(name, music, age, lang = "TypeScript" // We can give constructor params default values
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        // The following assignments in the body of the constructor are not required
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    getAge() {
        console.log(`Hello, I'm ${this.age}`);
    }
}
// Defining class members in several places like that feels redundant. The way to avoid it is by using Visibility Modifiers
// Put keywords in front of the constructor parameter
const Roman = new Coder("Roman", "J-pop", 19);
// Difference between private and protected
// protected means that it's only accessible within the class and its subclasses
// private means it can only be accessed within the original class
console.log(Roman.getAge());
// console.log(Roman.age); // Property 'age' is private and only accessible within class 'Coder'.
// console.log(Roman.lang); // Property 'lang' is protected and only accessible within class 'Coder' and its subclasses.
class WebDev extends Coder {
    constructor(computer, name, // We're not putting any modifiers on these
    music, age) {
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        console.log(`I write ${this.lang}`); // In the WebDev subclass we are able to access the protected lang property
    }
}
const Josh = new WebDev("Mac", "Josh", "Death Metal", 25);
Josh.getLang();
// We've used interface to create object literals, now let's use it for classes
class Guitarist {
    constructor(name, instrument) {
        this.name = name;
        this.instrument = instrument;
    }
    play(action) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}
const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums")); // Jimmy strums the guitar
///////////////////////////////////////////////////
class Peeps {
    static getCount() {
        return Peeps.count; // not using the this keyword because this points to the object on which method or field is being used, but static fields and methods are mede to be used in classes
    }
    constructor(name) {
        this.name = name;
        this.name = name;
        this.id = ++Peeps.count; // this is going to increase every time we create a Peeps instance
    }
}
Peeps.count = 0; // static methods and fields are only to be used on the class itself, not on class instances
const John = new Peeps("John");
const Steve = new Peeps("Steve");
const Amy = new Peeps("Amy");
console.log(Amy.id); // 3
console.log(Steve.id); // 2
console.log(John.id); // 1
console.log(Peeps.getCount()); // 3 // We created 3 instances of Peeps and the constructor ran 3 times, therefore id was incremented by 1 3 times
///////////////////////////////////////////////////
class Bands {
    constructor() {
        this.dataState = [];
    }
    get data() {
        return this.dataState;
    }
    set data(value) {
        if (Array.isArray(value) &&
            value.every((el) => typeof el === "string")) {
            this.dataState = value;
            return;
        }
        else
            throw new Error("Param is not an array of strings");
    }
}
const MyBands = new Bands();
MyBands.data = ["Neil Young", "Led Zep"]; // this is how we use a setter
console.log(MyBands.data); // this is how we use a getter
MyBands.data = [...MyBands.data, "ZZ Top"];
console.log(MyBands.data);
// MyBands.data = "Van Halen"; // not allowed
// I guess error checking like the one above makes sense if we allow compilation with TS errors
