import { ChangeEvent, ReactNode, useReducer } from "react";

const initState = { count: 0, text: "", isDark: false };

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
    TOGGLE_THEME,
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE;
    payload?: string;
};

const reducer = (
    state: typeof initState,
    action: ReducerAction
): typeof initState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 };
        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ...state, count: state.count - 1 };
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            return { ...state, text: action.payload ?? "" };
        // return { ...state, text: action.payload! };
        case REDUCER_ACTION_TYPE.TOGGLE_THEME:
            return { ...state, isDark: !state.isDark };
        default:
            throw new Error();
    }
};

type ChildrenType = {
    children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
    const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: REDUCER_ACTION_TYPE.NEW_INPUT,
            payload: e.target.value,
        });
    };
    const toggleTheme = () =>
        dispatch({ type: REDUCER_ACTION_TYPE.TOGGLE_THEME });

    return (
        <main className={state.isDark ? "dark" : ""}>
            <h1>{children(state.count)}</h1>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
            <button onClick={toggleTheme}>{state.isDark ? "🌞" : "🌚"}</button>
            <input type="text" onChange={handleTextInput} />
            <h2>{state.text}</h2>
        </main>
    );
};
export default Counter;
