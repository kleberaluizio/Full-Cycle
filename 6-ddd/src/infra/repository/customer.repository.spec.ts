import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer Repository Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },

        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: { id: "123"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city
        });
    });

    it("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer.Address = address;
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({where: { id: "123"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "123",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city
        });
    });

    it("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 123");
        const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);

        expect(customer).toStrictEqual(customerResult);
    });

    it("Should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        
        expect(async () => {
            await customerRepository.find("123");
        }).rejects.toThrow("Customer not found")
    });

    it("Should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 123");
        const address1 = new Address("Rua das flores", 2, "12346-78", "Joinville");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer("121", "Customer 121");
        const address2 = new Address("Rua das rosas", 1, "12246-78", "Joinville");
        customer2.Address = address2;
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);

    });

});