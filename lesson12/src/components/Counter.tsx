// import { useState } from "react";

import { ReactNode } from "react";

type CounterProps = {
    setCount: React.Dispatch<React.SetStateAction<number>>;
    children: ReactNode;
};

const Counter = ({ children, setCount }: CounterProps) => {
    // const [count, setCount] = useState<number>(1); // useState is a generic function
    // const [count, setCount] = useState<number | null>(null); // If we didn't assign initial value to state, we would have to add null as one of the values of type variables
    // const [count, setCount] = useState(1); // We actually don't even need to specify the type - TS can infer that

    return (
        <>
            <h1>{children}</h1>
            <button
                onClick={() => {
                    setCount((prevState) => prevState + 1);
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    setCount((prevState) => prevState - 1);
                }}
            >
                -
            </button>
        </>
    );
};

export default Counter;
