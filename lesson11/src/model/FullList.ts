import ListItem from "./ListItem";

interface List {
    list: ListItem[];
    load(): void;
    save(): void;
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(id: string): void; // all these methods have void return type, and that's a common pattern when working with the DOM
}

export default class FullList implements List {
    static instance: FullList = new FullList(); // we can do this to create a single instance of FullList

    private constructor(private _list: ListItem[] = []) {} // we can make constructor private because we're only going to need one instance of FullList
    // Singleton is a design pattern that tells us that we can create only one instance of a class and that instance can be accessed globally.

    get list(): ListItem[] {
        return this._list;
    }

    load(): void {
        const storedList: string | null = localStorage.getItem("list");
        if (typeof storedList !== "string") return;

        const parsedList: { _id: string; _item: string; _checked: boolean }[] =
            JSON.parse(storedList);

        parsedList.forEach((itemObj) => {
            const newListItem = new ListItem(
                itemObj._id,
                itemObj._item,
                itemObj._checked
            );
            FullList.instance.addItem(newListItem);
        });
    }

    save(): void {
        localStorage.setItem("list", JSON.stringify(this._list));
    }

    public clearList(): void {
        this._list = [];
        this.save();
    }

    public addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
        this.save();
    }

    public removeItem(id: string): void {
        this._list = this._list.filter((item) => item.id !== id);
        this.save();
    }
}
