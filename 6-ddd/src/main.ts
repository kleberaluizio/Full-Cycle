import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

// Customer Aggregate
let customer = new Customer("123", "Kleber Aluizio");
const address = new Address("Rua das flores", 2, "12346-78", "Joinville");
customer.Address = address;
customer.activate();

//Order Aggregate
const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", "123", [item1, item2])