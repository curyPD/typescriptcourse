"use strict";
// UTILITY TYPES
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const updateAssignment = (assign, propsToUpdate) => {
    return Object.assign(Object.assign({}, assign), propsToUpdate);
};
const assign1 = {
    studentId: "compcsi123",
    title: "Final Project",
    grade: 0,
};
console.log(updateAssignment(assign1, { grade: 95 }));
const assignGraded = updateAssignment(assign1, { grade: 95 });
// Hover over Partial to see what it does - you're a smart guy, you can do this
// Partial is a type with all properties of the type/interface it got passed in being optional => we're passing Assignment to it as a type variable, and now as the second argument of the function we can pass an object of type Assignment with all properties being optional
// Required and Readonly
// Required makes all properties required (even optional ones)
const recordAssignment = (assign) => {
    // send to database, etc.
    return assign;
};
const assignVerified = Object.assign(Object.assign({}, assignGraded), { verified: true });
// assignVerified.grade = 100 // Cannot assign to "grade" because it is a read-only property
// recordAssignment(assignGraded) // assignGraded is missing the varified property, which wasn't required when creating assignGraded, but is required in recordAssignment argument type
recordAssignment(Object.assign(Object.assign({}, assignGraded), { verified: true })); // this works
// Record
const hexColorMap = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
};
const finalGrades = {
    Sara: "B",
    Kelly: "U",
};
const gradeData = {
    Sara: {
        assign1: 85,
        assign2: 93,
    },
    Kelly: {
        assign1: 76,
        assign2: 15,
    },
};
const score = { studentId: "k123", grade: 85 };
const preview = { studentId: "k123", title: "Final Project" };
// ReturnType
// type newAssign = { title: string; points: number };
// const createNewAssign = (title: string, points: number): newAssign => {
//     return { title, points };
// };
// Everything works fine here, however if we wanted to change this function, we'd also have to change the type newAssign
const createNewAssign = (title, points) => {
    return { title, points };
};
// Now NewAssign will know the return type of createNewAssign function, even if the function is changed
// Can be useful if we didn't create a function that we need to use, and modified it
const tsAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);
const assignArgs = ["Generics", 100]; // tuple
const tsAssign2 = createNewAssign(...assignArgs);
console.log(tsAssign2);
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .catch((err) => {
        if (err instanceof Error)
            console.log(err.message);
    });
    return data;
});
fetchUsers().then((users) => console.log(users));
