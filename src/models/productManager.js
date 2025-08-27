const fs = require('fs').promises;
const path = require('path');
const productsData = path.join(__dirname, '../data/products.json');

class ProductManager {
    #products = [];

    async init() {
        await this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(productsData, 'utf-8');
            this.#products = JSON.parse(data).map(p => ({
                ...p,
                id: Number(p.id),
                price: Number(p.price),
                stock: Number(p.stock)
            }));
        } catch (err) {
            console.error('Error al cargar los productos:', err);
            this.#products = [];
        }
    }

    async saveProducts() {
        try {
           await fs.writeFile(productsData, JSON.stringify(this.#products, null, 2));
        } catch (err) {
            console.error('Error al guardar los productos:', err);
        }
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        await this.loadProducts();

        if (!title || !description || !code || price == null || status == null || stock == null || !category || !thumbnails) {
            throw new Error('Se debe completar todos los campos');
        }

        if (this.#products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        const maxId = this.#products.length > 0 ? Math.max(...this.#products.map(p => p.id)) : 0;
        const newProduct = {
            id: maxId + 1,
            title,
            description,
            code,
            price: Number(price),
            status,
            stock: Number(stock),
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
        return this.#products;
    }

    async getProductById(id) {
        await this.loadProducts();
        if (!id || isNaN(id)) {
            throw new Error('Debe ingresar un ID numérico válido');
        }
        return this.#products.find(p => p.id === Number(id));
    }

    async updateProduct(id, updatedFields) {
        await this.loadProducts();
        const productIndex = this.#products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) throw new Error('Producto no encontrado');

        const product = this.#products[productIndex];
        this.#products[productIndex] = { ...product, ...updatedFields, id: product.id };
        await this.saveProducts();
        console.log('Producto actualizado correctamente:', this.#products[productIndex]);
        return this.#products[productIndex];
    }

    async deleteProduct(id) {
        await this.loadProducts();
        const productIndex = this.#products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) throw new Error('Producto no encontrado');

        const deletedProduct = this.#products.splice(productIndex, 1)[0];
        await this.saveProducts();
        console.log('Producto eliminado correctamente:', deletedProduct);
        return deletedProduct;
    }
}

(async () => {
    const productManager = new ProductManager();
    await productManager.init();
})();

module.exports = new ProductManager;