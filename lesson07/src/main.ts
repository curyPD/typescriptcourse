// INDEX SIGNATURES

// Index Signatures are useful when we're creating an object but we don't know the exact names of object keys, but we know the shape of the object and types of the values
// Also TypeScript requires an Index Signature if we're trying to access an object property dynamically

// interface TransactionObject {
//     Pizza: number;
//     Books: number;
//     Job: number;
// }
// interface TransactionObject {
//     [index: string]: number; // index signature // we're telling TS that all keys are of type string
// }
// interface TransactionObject {
//     readonly [index: string]: number; // by making it readonly we won't allow any assignments to properties of objects of this type
// }

// If we knew that we'd have Pizza, Books, and Job properties, but also wanted to provide an index signature, we would do this:
interface TransactionObject {
    readonly [index: string]: number;
    Pizza: number;
    Books: number;
    Job: number;
}

const todaysTransactions: TransactionObject = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Dave: 42, // Dave is not required
};

console.log(todaysTransactions.Pizza); // -10
console.log(todaysTransactions["Pizza"]); // -10

let prop: string = "Pizza";
console.log(todaysTransactions[prop]); // possible with Index Signature on type "TransactionObject"

// This is a common example of when we want to access an object property dynamically; we need to use Index Signature for this
const todaysNet = (transactions: TransactionObject): number => {
    let total: number = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};

console.log(todaysNet(todaysTransactions));

// todaysTransactions.Pizza = 40 // Index signature in "TransactionObject" only permits reading

console.log(todaysTransactions["Dave"]); // undefined // TS gives us no errors because it has no way of knowing what we're gonna name the keys of the object; it only knows that those are gonna be of type strings and have values of number type
// So this is not 100% save because there's a possibility that we'll try to access a property that doesn't exist on the object

///////////////////////////////////////////////

interface Student {
    // [key: string]: string | number | number[] | undefined; // We're making it possible to add other properties besides the 3 required ones // When adding an index signature we have to mention all value types that we know will exist on this interface
    name: string;
    GPA: number;
    classes?: number[];
}

const student: Student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200],
};

// console.log(student.test); // undefined // Now that we included an index signature, we've introduced the potential for a problem, since TypeScript doesn't know whether or not we created a test property on the object of type Student, therefore this doesn't create an error

// for (const key in student) {
//     console.log(`${key}: ${student[key]}`); // problem (if no index signature)
// }

// Let's see how we can iterate through an object that doesn't have an index signature
// We'll use the keyof keyword + Assertions

for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`);
}
// keyof creates a union type of specific type literals - in this case: "name" | "GPA" | "classes"

// What if we didn't know the exact interface of an object?
// Say we didn't know the type of student
Object.keys(student).forEach((key) => {
    console.log(student[key as keyof typeof student]); // this works! 🎉
}); // we're retrieving the type of student with typeof student

// EXAMPLE OF keyof IN FUNCTIONS
const logStudentKey = (student: Student, key: keyof Student): void => {
    console.log(`Student ${key}: ${student[key]}`); // the only reason why we specified "keyof Student" in the params is so that we can do student[key]; just letting you know
};

logStudentKey(student, "GPA");

///////////////////////////////////////////////

// interface Incomes {
//     [key: string]: number // we can't use a literal type here
// }

type Streams = "salary" | "bonus" | "sidehustle";

type Incomes = Record<Streams, number>; // the benefit of creating index signatures this way is that we can create properties of literal type

const monthlyIncomes: Incomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250,
};

for (const revenue in monthlyIncomes) {
    // console.log(monthlyIncomes[revenue]); // We can't do this if we use type declaration like above
    console.log(monthlyIncomes[revenue as keyof Incomes]); // We have to use keyof assertion
}
