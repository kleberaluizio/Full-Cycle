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

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId(): string {
        return this._product_id;
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