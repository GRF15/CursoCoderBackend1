const fs = require('fs');
const path = require('path');
const productsData = path.join(__dirname,'../data/products.json');

class ProductManager {
    #products 

    constructor() { 
        this.#products = []
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFileSync(productsData, 'utf-8');
            this.#products = JSON.parse(data).map(p => ({...p, id: Number(p.id), price: Number(p.price), stock: Number(p.stock)}));
        }
        catch (err) {
            console.error('Error al cargar los productos:', err);
            this.#products = [];
        }
    }

    async saveProducts() {
        try {
           await fs.writeFileSync(productsData, JSON.stringify(this.#products, null, 2));
        } catch (err) {
            console.error('Error al guardar los productos:', err);
        }
    }



    async addProduct (title, description, code, price, status, stock, category, thumbnails) {
        await this.loadProducts();
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            throw new Error('Se debe completar todos los campos');
        }
        if (this.#products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }
        const arrayId = this.#products.length > 0 ? Math.max(...this.#products.map(p => p.id)) : 0;
        const newProduct = {
            id: arrayId + 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        };

        this.#products.push(newProduct);
        await this.saveProducts();
        console.log('Producto agregado correctamente con ID:', newProduct.id);
        return newProduct;
        
    }

    async getProducts() {
        await this.loadProducts();
        if (this.#products.length === 0) {
            console.log('No hay productos disponibles');
            return [];
        }
        return this.#products;
    }

    async getProductById(id) {
        await this.loadProducts();
        if (!id) {
            console.error('Debe ingresar un ID válido');
            return;
        }
        if (isNaN(id)) {
                console.error('El ID debe ser un número');
            return;
        }
        return this.#products.find(p => p.id === Number(id));
    }

    async updateProduct(id, updatedFields) {
        await this.loadProducts();
        const productIndex = this.#products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        const product = this.#products[productIndex];
        this.#products[productIndex] = { ...product, ...updatedFields, id: product.id };
        console.log('Producto actualizado correctamente:', this.#products[productIndex]);
        await this.saveProducts();
        return this.#products[productIndex];
    }

    async deleteProduct(id) {
        await this.loadProducts();
        const productIndex = this.#products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        const deletedProduct = this.#products.splice(productIndex, 1) [0];
        console.log('Producto eliminado correctamente:', deletedProduct);
        await this.saveProducts();
        return deletedProduct;
    }


}

let productManager = new ProductManager();


console.log(productManager.getProducts());

module.exports = productManager;
