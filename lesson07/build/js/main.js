"use strict";
// INDEX SIGNATURES
const todaysTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Dave: 42, // Dave is not required
};
console.log(todaysTransactions.Pizza); // -10
console.log(todaysTransactions["Pizza"]); // -10
let prop = "Pizza";
console.log(todaysTransactions[prop]); // possible with Index Signature on type "TransactionObject"
// This is a common example of when we want to access an object property dynamically; we need to use Index Signature for this
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction];
    }
    return total;
};
console.log(todaysNet(todaysTransactions));
// todaysTransactions.Pizza = 40 // Index signature in "TransactionObject" only permits reading
console.log(todaysTransactions["Dave"]); // undefined // TS gives us no errors because it has no way of knowing what we're gonna name the keys of the object; it only knows that those are gonna be of type strings and have values of number type
const student = {
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
    console.log(`${key}: ${student[key]}`);
}
// keyof creates a union type of specific type literals - in this case: "name" | "GPA" | "classes"
// What if we didn't know the exact interface of an object?
// Say we didn't know the type of student
Object.keys(student).map((key) => {
    console.log(student[key]); // this works! 🎉
}); // we're retrieving the type of student with typeof student
// EXAMPLE OF keyof IN FUNCTIONS
const logStudentKey = (student, key) => {
    console.log(`Student ${key}: ${student[key]}`); // the only reason why we specified "keyof Student" in the params is so that we can do student[key]; just letting you know
};
logStudentKey(student, "GPA");
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250,
};
for (const revenue in monthlyIncomes) {
    // console.log(monthlyIncomes[revenue]); // We can't do this if we use type declaration like above
    console.log(monthlyIncomes[revenue]); // We have to use keyof assertion
}
