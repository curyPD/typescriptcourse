import { ReactElement } from "react";

type HeadingProps = { title: string }; // defining props type

const Heading = ({ title }: HeadingProps): ReactElement => {
    return <h1>{title}</h1>;
};
// We can define return type of a functional component, although it's not neccessary and it's fine to let TypeScript infer the return type
// If we were to do it anyways, JSX.Element would be the return type, OR in case the function only returns a single React element, we can be a bit more specific and say ReactElement

export default Heading;
