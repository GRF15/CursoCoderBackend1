
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');
const Product = require('./models/product.model'); 

// Conexión a MongoDB
mongoose.connect('mongodb+srv://GG33:fAqhQJXM0GiUL6uJ@clustercoderbakend1.zxrjerd.mongodb.net/ecommerce?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(error => console.error('❌ Error al conectar a MongoDB:', error));

const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', engine({helpers: {ifEquals: (a, b, options) => (a == b ? options.fn(this) : options.inverse(this))}}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Compartir io en la app para usarlo en routers
app.set('io', io);

// Socket.io con Mongoose
io.on('connection', async (socket) => {
  console.log(`Nuevo socket conectado: ${socket.id}`);

  // Enviar productos actuales
  const products = await Product.find().lean();
  socket.emit('products', products);

  // Agregar producto
  socket.on('addProduct', async (data) => {
    try {
      await Product.create(data);
      const updatedProducts = await Product.find().lean();
      io.emit('products', updatedProducts);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  // Eliminar producto
  socket.on('deleteProduct', async (id) => {
    try {
      await Product.findByIdAndDelete(id);
      const updatedProducts = await Product.find().lean();
      io.emit('products', updatedProducts);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket desconectado');
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
});

module.exports = { app, io };