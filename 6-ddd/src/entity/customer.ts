class Customer {
    _id: string;
    _name: string;
    _address: string = "";
    _active: boolean = true;

    constructor(id: string, name: string) {  
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        let errors: string[] = [];
        if (this._id.length === 0) {
            errors.push("id");
        }
        if (this._name.length === 0) {
            errors.push("name");
        }
        if (errors.length > 0) {
            let errorMessage = "Required parameters: "
            for (let error in errors) {
                errorMessage.concat(error).concat(", ");
            }
            throw new Error(errorMessage);
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address.length === 0) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true;
    }

     deactivate() {
        this._active = false;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
}

let customer = new Customer("", "");