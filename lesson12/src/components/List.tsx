import { ReactNode } from "react";

// Let's create a generic component
interface ListProps<T> {
    items: T[];
    render: (item: T) => ReactNode;
}

// const List = <T>({items, render}: ListProps<T>) => { // TypeScript is having a hard time recognizing type parameter in the context of React; two possible solutions to help it out are <T extends {}> and <T,>
const List = <T,>({ items, render }: ListProps<T>) => {
    return (
        <ul>
            {items.map((item, i) => {
                return <li key={i}>{render(item)}</li>;
            })}
        </ul>
    );
};

export default List;
