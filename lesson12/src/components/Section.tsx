// This is the old way of using TypeScript with React, which after React v18 came out is no longer being used
/*
import React, {ReactNode} from "react";

const Section: React.FC<{ title: string }> = ({ children, title }) => {
    return (
        <section>
            <h1>{title}</h1>
            <p>{children}</p>
            </section>
    );
};
*/
import { ReactNode } from "react";

type SectionProps = {
    title?: string;
    children: ReactNode; // Prior to React v18 we didn't have to annotate the type of the children prop, now we do
};

const Section = ({ children, title = "My Subheading" }: SectionProps) => {
    // We gave title a default value right in the props, which would look differently prior to React v18 - we'd have to define default props separately
    // Here since title is optional, we should give it a default value
    return (
        <section>
            <h1>{title}</h1>
            <p>{children}</p>
        </section>
    );
};

export default Section;
