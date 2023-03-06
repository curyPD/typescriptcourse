import Heading from "./components/Heading";
import Section from "./components/Section";
import Counter from "./components/Counter";
import List from "./components/List";
import { useState } from "react";

function App() {
    const [count, setCount] = useState<number>(1); // having this state in the parent is not something we would normally do, it's simply an example to demonstrate how state setter function can be passed down as props, as well as use of children prop

    return (
        <>
            <Heading title={"Hello"} />
            <Section>This is my Section.</Section>
            <Counter setCount={setCount}>Count is {count}</Counter>
            <List
                items={["☕ Coffee", "🌮 Tacos", "💻 Code"]}
                render={(item: string) => (
                    <span className="gold bold">{item}</span>
                )}
            />
        </>
    );
}

export default App;
