import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    MouseEvent,
    KeyboardEvent,
} from "react";

interface User {
    id: number;
    username: string;
}

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}; // Expensive calculation

const myNum: number = 10;

function App() {
    const [count, setCount] = useState<number>(0);
    // const [user, setUser] = useState<User>({} as User); // Avoid using assertions in this way since you're lying to the compiler, and he's a good guy
    const [users, setUsers] = useState<User[] | null>(null);

    const inputRef = useRef<HTMLInputElement>(null); // wow, wait a second, we provided null as the initial value, but didn't include null in the union of type params!!!😡; we can do that

    console.log(inputRef?.current);
    console.log(inputRef?.current?.value);

    // When it comes to useEffect, there's nothing TypeScript specific we can do since useEffect doesn't return a value
    useEffect(() => {
        console.log("mounting");
        console.log("Users:", users);

        return () => console.log("unmounting");
    }, [users]);

    const addTwo = useCallback(
        (
            e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
        ): void => setCount((prev) => prev + 2),
        []
    ); // This example is not using event property, but we'll specify it for demonstration purposes
    // Prior to React 18 we didn't have to annotate the type of e

    const result = useMemo<number>(() => fib(myNum), [myNum]);

    return (
        <div className="App">
            <h1>{count}</h1>
            <button onClick={addTwo}>Add 2</button>
            <h2>{result}</h2>
            <input type="text" ref={inputRef} />
        </div>
    );
}

export default App;
