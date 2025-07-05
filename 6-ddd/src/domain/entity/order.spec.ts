import Order from "./order"
import OrderItem from "./order_item"

describe("Order unit tests", ()=>{

    it("should throw error when id is empty", ()=>{
        expect(() => {
            const order = new Order("", "123",[])
        })
        .toThrow("Id is required!")
    })

    it("should throw error when customerId is empty", ()=>{
        expect(() => {
            const order = new Order("1", "",[])
        })
        .toThrow("CustomerId is required!")
    })

    it("should throw error when items is empty", ()=>{
        expect(() => {
            const order = new Order("1", "1",[])
        })
        .toThrow("Items are required!")
    })

    it("should calculate total", () => {
        const items = [
            new OrderItem("1", "Item 1", 20, 2, "p1"), 
            new OrderItem("2", "Item 2", 35.5, 3, "p2")
        ];

        const order = new Order("1", "1", items)
        const total = order.total();

        expect(total).toBe((20 * 2 + 35.5 * 3));
    })

    it("should throw error if item quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 20, 0, "p1")
        }).toThrow("Quantity should be greater than zero")
    })

})