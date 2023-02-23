import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement;
    clear(): void;
    render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
    public ul: HTMLUListElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement;
    }

    public clear(): void {
        this.ul.innerHTML = "";
    }

    public render(fullList: FullList): void {
        this.clear();
        fullList.list.forEach((el) => {
            const listItem = document.createElement("li") as HTMLLIElement;
            listItem.classList.add("item");

            const checkbox = document.createElement(
                "input"
            ) as HTMLInputElement;
            checkbox.type = "checkbox";
            checkbox.id = el.id;
            checkbox.checked = el.checked;
            listItem.append(checkbox);

            checkbox.addEventListener("change", () => {
                el.checked = !el.checked;
                fullList.save();
            });

            const label = document.createElement("label") as HTMLLabelElement;
            label.htmlFor = el.id;
            label.textContent = el.item;
            listItem.append(label);

            const button = document.createElement(
                "button"
            ) as HTMLButtonElement;
            button.classList.add("button");
            button.textContent = "X";
            button.addEventListener("click", () => {
                fullList.removeItem(el.id);
                this.render(fullList);
            });
            listItem.append(button);
            this.ul.append(listItem);
        });
    }
}
