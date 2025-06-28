import Customer  from './customer';
import Address  from './address';

describe("Customer unit tests", ()=>{
    it("should throw error when id is empty", ()=>{
        expect(() => {
            let customer = new Customer("", "Maria")
        }).toThrow("Id is required!");
    })

    it("should throw error when name is empty", ()=>{
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrow("Name is required!");
    })

    it("should activate customer", ()=>{
        // Arrange
        const customer = new Customer("1", "Customer 1")
        const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer.Address = address;

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true);
    })

    it("should deactivate customer", ()=>{
        // Arrange
        const customer = new Customer("1", "Customer 1")
        const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer.Address = address;
        customer.activate();

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it("should thorw error when address is undefined customer", ()=>{
        const customer = new Customer("1", "Customer 1")

        expect(() => {customer.activate();}).toThrow("Address is mandatory to activate a customer");
    })

})