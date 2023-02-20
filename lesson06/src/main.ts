class Coder {
    // name: string; // we need a property to be defined both as a member outside of constructor, and inside of the constructor
    // music: string;
    // age: number;
    // lang: string;

    // There's a way to avoid TS alert when defining members by using assertions
    // secondLang!: string // As a beginner, stay away from this

    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = "TypeScript" // We can give constructor params default values
    ) {
        // The following assignments in the body of the constructor are not required
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }

    public getAge() {
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
    constructor(
        public computer: string,
        name: string, // We're not putting any modifiers on these
        music: string,
        age: number
    ) {
        super(name, music, age);
        this.computer = computer;
    }

    public getLang() {
        console.log(`I write ${this.lang}`); // In the WebDev subclass we are able to access the protected lang property
    }
}

const Josh = new WebDev("Mac", "Josh", "Death Metal", 25);
Josh.getLang();
// console.log(Josh.age); // Property "age" is private and only accessible within class "Coder"
// console.log(Josh.lang); // Property 'lang' is protected and only accessible within class 'Coder' and its subclasses

///////////////////////////////////////////////////

interface Musician {
    name: string;
    instrument: string;
    play(action: string): string;
}

// We've used interface to create object literals, now let's use it for classes
class Guitarist implements Musician {
    name: string;
    instrument: string;

    constructor(name: string, instrument: string) {
        this.name = name;
        this.instrument = instrument;
    }

    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`;
    }
}

const Page = new Guitarist("Jimmy", "guitar");
console.log(Page.play("strums")); // Jimmy strums the guitar

///////////////////////////////////////////////////

class Peeps {
    static count: number = 0; // static methods and fields are only to be used on the class itself, not on class instances

    static getCount(): number {
        return Peeps.count; // not using the this keyword because this points to the object on which method or field is being used, but static fields and methods are made to be used in classes
    }

    public id: number;

    constructor(public name: string) {
        this.name = name;
        this.id = ++Peeps.count; // this is going to increase every time we create a Peeps instance
    }
}

const John = new Peeps("John");
const Steve = new Peeps("Steve");
const Amy = new Peeps("Amy");

console.log(Amy.id); // 3
console.log(Steve.id); // 2
console.log(John.id); // 1
console.log(Peeps.getCount()); // 3 // We created 3 instances of Peeps and the constructor ran 3 times, therefore id was incremented by 1 3 times

///////////////////////////////////////////////////

class Bands {
    private dataState: string[];

    constructor() {
        this.dataState = [];
    }

    public get data(): string[] {
        return this.dataState;
    }

    public set data(value: string[]) {
        if (
            Array.isArray(value) &&
            value.every((el) => typeof el === "string")
        ) {
            this.dataState = value;
            return;
        } else throw new Error("Param is not an array of strings");
    }
}

const MyBands = new Bands();
MyBands.data = ["Neil Young", "Led Zep"]; // this is how we use a setter
console.log(MyBands.data); // this is how we use a getter
MyBands.data = [...MyBands.data, "ZZ Top"];
console.log(MyBands.data);
// MyBands.data = "Van Halen"; // not allowed
// I guess error checking like the one above makes sense if we allow compilation with TS errors
