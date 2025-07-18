import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "./product.model";
import { OrderModel } from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false,
})
export class OrderItemModel extends Model {
        
    @PrimaryKey
    @Column
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @Column({ allowNull: false })
    declare quantity: number;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

}