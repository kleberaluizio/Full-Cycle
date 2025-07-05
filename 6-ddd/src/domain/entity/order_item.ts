export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    private _product_id: string;


    constructor(id: string, name: string, price: number, quantity: number, product_id: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._product_id = product_id;
        this.validate();
    }

    get price(): number {
        return this._price;
    }

    validate(): boolean {
        if(this._quantity <= 0) {
            throw new Error("Quantity should be greater than zero")
        }
        return true;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}