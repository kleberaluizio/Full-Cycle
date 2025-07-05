import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", ()=> {
    
    it("should place an order", () => {
        const customer = new Customer("1", "Pedro");
        const item1 = new OrderItem("1", "item 1", 10, 5, "p1");

        const order =  OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(25);
        expect(order.total()).toBe(50);
    });

    it("should throw when order to be placed with empty items", () => {
        const customer = new Customer("1", "Pedro");
        const item1 = new OrderItem("1", "item 1", 10, 5, "p1");

        expect(() => {
            const order = OrderService.placeOrder(customer, []);
        }).toThrow("Order must have at least one item");
    });

    it("Should get total of all orders", () => {
        const item1 = new OrderItem("1", "item 1", 10, 5, "p1");
        const item2 = new OrderItem("2", "item 2", 90, 1, "p1");
        const order1 = new Order("1", "order 1", [item1, item2]);

        const item3 = new OrderItem("3", "item 3", 2, 2, "p2");
        const item4 = new OrderItem("4", "item 4", 15, 2, "p2");
        const order2 = new Order("2", "order 2", [item3, item4]);
        const orders = [order1, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(10 * 5 + 90 * 1 + 2 * 2 + 15 * 2);
    });
})
//"npm run tsc -- --noEmit && jest