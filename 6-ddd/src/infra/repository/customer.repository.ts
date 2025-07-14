import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { CustomerModel } from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints
            },
            {
                where: {id: entity.id}
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let existingCustomer;
        try {
            existingCustomer = await CustomerModel.findOne({ where: { id: id }, rejectOnEmpty: true });
        } catch (error) {
            throw new Error("Customer not found")
        }
        const address = new Address(existingCustomer.street, existingCustomer.number, existingCustomer.zip, existingCustomer.city);
        const customer = new Customer(existingCustomer.id, existingCustomer.name);
        customer.Address = address;
        if (existingCustomer.active) {
            customer.activate();
        }
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const existingCustomers = await CustomerModel.findAll();
        return existingCustomers.map((c) => {
            const address = new Address(c.street, c.number, c.zip, c.city);
            let  customer = new Customer(c.id, c.name);
            customer.addRewardPoints(c.rewardPoints)
            customer.Address = address;
            if (c.active) {
                customer.activate();
            }
            return customer;
        });
    }

}