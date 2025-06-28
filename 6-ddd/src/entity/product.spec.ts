import Product from "./product";

describe("Product unit tests", ()=>{
    it("should throw error when id is empty", ()=>{
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("Id is required!");
    })

    it("should throw error when name is empty", ()=>{
        expect(() => {
            const product = new Product("1", "", 100);
        }).toThrow("Name is required!");
    })

    it("should throw error when price is empty", ()=>{
        expect(() => {
            const product = new Product("1", "Product 1", 0);
        }).toThrow("Price is required!");
    })
    
    it("should throw error when price is less than zero", ()=>{
        expect(() => {
            const product = new Product("1", "Product 1", -1);
        }).toThrow("Price must be a positive!");
    })

    it("should change name", ()=>{
        const NEW_NAME = "Great product";
        let product = new Product("1", "Product 1", 100);
        product.changeName(NEW_NAME);
        expect(product.name).toBe(NEW_NAME);
    })

    it("should change price", ()=>{
        const NEW_PRICE = 2;
        let product = new Product("1", "Product 1", 100);
        product.changePrice(NEW_PRICE);
        expect(product.price).toBe(NEW_PRICE);
    })
})