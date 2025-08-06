const fs = require('fs');
const path = require('path');
const cartsData = path.join(__dirname, '../data/carts.json');
const ProductManager = require('./productManager.js');

class CartManager {

    constructor() {
        this.carts = [];
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const data = await fs.readFileSync(cartsData, 'utf-8');
            this.carts = data ? JSON.parse(data) : [];
        } catch (err) {
            console.error('Error al cargar los carritos:', err);
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            await fs.promises.writeFile(cartsData, JSON.stringify(this.carts, null, 2));
        } catch (err) {
            console.error('Error al guardar los carritos:', err);
        }
    }

    async addCart(products = []) {
        await this.loadCarts();
        if (!Array.isArray(products)) {
            throw new Error('El carrito debe ser un array de productos');
        }

        const arrayId = this.carts.length > 0 ? Math.max(...this.carts.map(p => p.id)) : 0;
        const newCart = {
            id: arrayId + 1,
            products: []
        };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }

    async getCarts() {
        await this.loadCarts();
        return this.carts;
    }

    async getCartById(id) {
        await this.loadCarts();
        const cartId = Number(id);
        if (!cartId || isNaN(cartId)) {
            console.log('Debe ingresar un ID válido');
        }
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            console.log('Carrito no encontrado');
        }
        return cart || null;
    }

    async updateProduct(cartId, productId, quantity) {
        await this.loadCarts();
        const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
        if (cartIndex === -1) console.log('Carrito no encontrado');
        
        const product = await ProductManager.getProductById(productId);
        if (!product) throw new Error('Producto no encontrado');
        if (quantity < 1) throw new Error('La cantidad debe ser mayor a cero');

        const prodInCart = this.carts[cartIndex].products.find(item => item.product === productId);
        if (prodInCart) {
           if (prodInCart.quantity + quantity > product.stock) {
                throw new Error(`No hay suficiente stock para el producto ${product.title}`);
            }
            prodInCart.quantity += quantity;
        } else {
            if (quantity > product.stock) {
                throw new Error(`No hay suficiente stock para el producto ${product.title}`);
            }
            this.carts[cartIndex].products.push({ productId: productId, quantity });
        }

        await this.saveCarts();
        return this.carts[cartIndex];
    }

    async deleteCart(id) {
        await this.loadCarts();
        const cartIndex = this.carts.findIndex(cart => cart.id === Number(id));
        if (cartIndex === -1) {
            console.log('Carrito no encontrado');
        }
        const deletedCart = this.carts.splice(cartIndex, 1)[0];
        await this.saveCarts();
        console.log('Carrito eliminado correctamente:', deletedCart);
        return deletedCart;
    }

}

let cartManager = new CartManager();
module.exports = cartManager;

// cartManager.addCart().then(cart => {
//     console.log('Nuevo carrito creado:', cart);
// }).catch(err => {
//     console.error('Error al crear el carrito:', err);
// });

// cartManager.updateProduct(3, 2, 3).then(cart => {
//     console.log('Producto actualizado en el carrito:', cart);
// }).catch(err => {
//     console.error('Error al actualizar el producto:', err);
// });

console.log(cartManager.getCarts());