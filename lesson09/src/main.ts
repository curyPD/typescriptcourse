// UTILITY TYPES

// Utility types are helpful for type transformation

// Partial

interface Assignment {
    studentId: string;
    title: string;
    grade: number;
    verified?: boolean;
}

const updateAssignment = (
    assign: Assignment,
    propsToUpdate: Partial<Assignment>
): Assignment => {
    return { ...assign, ...propsToUpdate };
};

const assign1: Assignment = {
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
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // send to database, etc.
    return assign;
};

const assignVerified: Readonly<Assignment> = {
    ...assignGraded,
    verified: true,
};

// assignVerified.grade = 100 // Cannot assign to "grade" because it is a read-only property
// recordAssignment(assignGraded) // assignGraded is missing the varified property, which wasn't required when creating assignGraded, but is required in recordAssignment argument type
recordAssignment({ ...assignGraded, verified: true }); // this works

// Record
const hexColorMap: Record<string, string> = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
};
// probably the most commonly used Utility Type

type Students = "Sara" | "Kelly";
type LetterGrades = "A" | "B" | "C" | "D" | "U";

const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "U",
};

interface Grades {
    assign1: number;
    assign2: number;
}

const gradeData: Record<Students, Grades> = {
    Sara: {
        assign1: 85,
        assign2: 93,
    },
    Kelly: {
        assign1: 76,
        assign2: 15,
    },
};

// Pick & Omit

type AssignResult = Pick<Assignment, "studentId" | "grade">;

const score: AssignResult = { studentId: "k123", grade: 85 };

type AssignPreview = Omit<Assignment, "grade" | "verified">;

const preview: AssignPreview = { studentId: "k123", title: "Final Project" };

// Exclude & Extract

type adjustedGrade = Exclude<LetterGrades, "U">;

type highGrades = Extract<LetterGrades, "A" | "B">;

// Nonnullable

type AllPossibleGrades = "Dave" | "John" | null | undefined;

type NamesOnly = NonNullable<AllPossibleGrades>;

// ReturnType

// type newAssign = { title: string; points: number };

// const createNewAssign = (title: string, points: number): newAssign => {
//     return { title, points };
// };
// Everything works fine here, however if we wanted to change this function, we'd also have to change the type newAssign

const createNewAssign = (title: string, points: number) => {
    return { title, points };
};

type NewAssign = ReturnType<typeof createNewAssign>;
// Now NewAssign will know the return type of createNewAssign function, even if the function is changed
// Can be useful if we didn't create a function that we need to use, and modified it

const tsAssign: NewAssign = createNewAssign("Utility Types", 100);
console.log(tsAssign);

// Parameters

type AssignParams = Parameters<typeof createNewAssign>;

const assignArgs: AssignParams = ["Generics", 100]; // tuple

const tsAssign2: NewAssign = createNewAssign(...assignArgs);
console.log(tsAssign2);

// Awaited - helps us with the ReturnType of a Promise

interface User {
    id: number;
    name: string;
    userName: string;
    email: string;
}

const fetchUsers = async (): Promise<User[]> => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .catch((err) => {
            if (err instanceof Error) console.log(err.message);
        });

    return data;
};

// type FetchUsersReturnType = ReturnType<typeof fetchUsers> // this will be Promise<User[]>, however we don't want a promise, we want a result

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>; // User[]

fetchUsers().then((users) => console.log(users));
