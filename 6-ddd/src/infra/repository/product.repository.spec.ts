import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },

        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        });
    });

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1"}});

        product.changeName("New Name");
        product.changePrice(200);

        await productRepository.update(product);
        const productModel2 = await ProductModel.findOne({where: { id: "1"}});

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "New Name",
            price: 200
        });
    });

    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: { id: "1"}});

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it("Should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 100);
        await productRepository.create(product1);

        const product2 = new Product("2", "Product 2", 300);
        await productRepository.create(product2);

        const products = [product1, product2];
        const foundProducts = await productRepository.findAll();

        expect(products).toEqual(foundProducts);
    });
});