import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {id: entity.id}
            }
        );
    }

    async find(id: string): Promise<Product> {
        const existingProduct = await ProductModel.findOne({where: {id: id}});
        return new Product(existingProduct.id, existingProduct.name, existingProduct.price);
    }

    async findAll(): Promise<Product[]> {
        const existingProducts = await ProductModel.findAll();
        return existingProducts.map((p) =>  new Product(p.id, p.name, p.price));
    }

}