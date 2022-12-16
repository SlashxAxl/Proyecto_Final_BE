import Product from "./src/Product";
import fs, { readFileSync } from 'fs';
import { throws } from "assert";
import { json } from "stream/consumers";


export default class ProductManager{
    static #lastProductId;
    static #defaultPersistFilePath = '/src/Product.json';
    static #persistFileOptions = {
        encoding : 'utf-8',
    }
    #products = [];

    constructor(persistFilePath){
        this.path = (persistFilePath ?? ProductManager.#defaultPersistFilePath);
        this.#init();
    }
    get count(){
        return this.#products.length;
    }
    get nextProductID(){
        return ProductManager.getLastProductId() + 1;
    }

    addProduct = (newProduct) => {
        if (!this.#products.some(product => product.code === newProduct.code)) {
            newProduct.id = ProductManager.getNewProductId();
            this.#products.push(newProduct);
            return newProduct.id;
        }
        throw new Error(`Ya existe un producto con el codigo ${newProduct.code}`)
    }

    updateProduct = (productId, updateProduct) => {
        const productFoundIndex = this.#products.findIndex(product => product.id === productId);
        if (productFoundIndex !== -1) {
            const newProduct = new Product(
                updateProduct.title,
                updateProduct.description,
                updateProduct.code,
                updateProduct.price,
                updateProduct.status,
                updateProduct.stock,
                updateProduct.category,
                updateProduct.thumbnail,
            );
            newProduct.id = productId;
            this.#products = [
                ...this.#products.slice(0,productFoundIndex),
                newProduct,
                ...this.#products.slice(productFoundIndex + 1)
            ];
            return true
        }else{
            throw new Error(`No se actualizo ningun producto. No se encontro un profucto con el id ${productId}`)
        }
    }
    deleteProduct = (productId) => {
        const productFoundIndex = this.#products.findIndex(product => product.id === productId);
        if (productFoundIndex != -1) {
            this.#products = [
                ...this.#products.slice(0,productFoundIndex),
                ...this.#products.slice(productFoundIndex + 1)
            ];
            return this.#products.length;
        }else{
            throw new Error(`No se borro ningun producto. No existe ningun producto con el id ${productId}`)
        }
    }
    reset = () => {
        this.#products = [];
        ProductManager.#lastProductId = 0;
    }
    getProducts = () => {
        return this.#products;
    }
    getProductById = (productId) => {
        const foundProduct = this.#products.find(product => product.id === productId);
        if (foundProduct) return foundProduct;
        throw new Error(`No se encontro producto con id ${productId}`)
    }
    getProductByCode = (productCode) => {
        const foundProduct = this.#products.find(product => product.code === productCode.trim());
        if (foundProduct) return foundProduct
        throw new Error(`No se encontro producto con codigo ${productCode}`)
    }
    getPersistPath = () => this.path;
    #init = () => {
        if (existsSync(this.getPersistPath())) {
            const fileReader = readFileSync(this.getPersistPath(),ProductManager.#persistFileOptions);
            const persistedProductManager = json.parse(fileReader);
            ProductManager.#setLastProductId(persistedProductManager.lastProductId)
            this.#setProducts(persistedProductManager.products.map(product => {
                const managedProduct = new Product(
                    product.title,
                    product.description,
                    product.code,
                    product.price,
                    product.status,
                    product.stock,
                    product.category,
                    product.thumbnail,
                )
                managedProduct.id = product.id;
                return managedProduct
            }))
        } else {
            ProductManager.#lastProductId = 0;
        }
        #setProducts = (products) => {
            this.#products = [...products]
            return this.#products.length
        }
        #getPersistObject = () => {
            const persistObject = {};
            persistObject.lastProductId = ProductManager.getLastProductId();
            persistObject.products = this.getProducts()

            return json.stringify(persistObject)
        }

        static getLastProductId = () => {
            return ProductManager.#lastProductId;
        }

        static #getNewProductId = () => {
            return ++ProductManager.#lastProductId
        }
        static #setLastProductId = (value) => {
            if (value && value >= 0) {
                ProductManager.#lastProductId = value;
                return ProductManager.#lastProductId
            }
            return 0;
        }
    }
}