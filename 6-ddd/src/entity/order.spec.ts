import Order from "./order"

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

})