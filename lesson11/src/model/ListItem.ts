export interface Item {
    id: string;
    item: string;
    checked: boolean;
}
// these properties refer to getters and setters
// the actual pieces of state in the class will have _ in their names
// after compilation no fields like "private" or "protected" will be in JS file, but class fields prefixed with _ will still be prefixed with _

export default class ListItem implements Item {
    constructor(
        // we could give these default values
        private _id: string = "",
        private _item: string = "",
        private _checked: boolean = false
    ) {
        // We don't have to include assignments in the contructor body
        // this._id = _id;
        // this._item = _item;
        // this._checked = _checked;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get item(): string {
        return this._item;
    }

    set item(item: string) {
        this._item = item;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        this._checked = checked;
    }
}
