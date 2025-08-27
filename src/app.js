const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');
const productManager = require('./models/productManager');
const e = require('express');

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido al servidor' });
});
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);

// Compartir io en la app para usarlo en routers
app.set('io', io);

// Socket.io
io.on('connection', (socket) => {
    console.log(`Nuevo socket conectado: ${socket.id}`);

    productManager.getProducts().then(products => {
        socket.emit('products', products);
    });

    // agregar producto
    socket.on('addProduct', async (data) => {
        try {
            await productManager.addProduct(
                data.title,
                data.description,
                data.code,
                data.price,
                data.status,
                data.stock,
                data.category,
                data.thumbnails
            );
            const products = await productManager.getProducts();
            io.emit('products', products); 
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    // Eliminar producto
    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(Number(id));
            const products = await productManager.getProducts();
            io.emit('products', products); 
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket desconectado');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app, io ;