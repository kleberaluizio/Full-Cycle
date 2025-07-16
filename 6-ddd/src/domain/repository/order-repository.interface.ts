import Order from "../entity/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepository extends RepositoryInterface<Order> {}