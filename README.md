<<<<<<< HEAD
# Proyecto: API RESTful de Productos y Carritos con WebSockets

**Autor:** Gabriel Rodriguez
**Curso:** Backend - Coderhouse Segunda entrega

---

## Descripción

Servidor backend en **Node.js + Express** que expone una API RESTful para gestionar **productos** y **carritos**, con persistencia en archivos `.json`.
Incluye una interfaz de usuario con **Handlebars** y actualización en **tiempo real** mediante **Socket.IO**: la vista `realTimeProducts` permite agregar y eliminar productos y refleja los cambios instantáneamente en todos los clientes conectados. Los estilos están hechos con **Sass** y las notificaciones con **SweetAlert2**.

---

## Tecnologías

* Node.js, Express
* JavaScript (ES6)
* Handlebars (templates)
* Socket.IO (WebSockets)
* File System (`fs`) para persistencia en JSON
* Sass para estilos (`/src/sass/style.scss`)
* SweetAlert2 para alertas

---

## Estructura del proyecto

```
/src
├── controllers/
│   ├── products.controller.js
│   └── carts.controller.js
├── models/
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/
│   ├── products.router.js
│   ├── carts.router.js
│   └── views.router.js
├── data/
│   ├── products.json
│   └── carts.json
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── index.handlebars
│   └── realTimeProducts.handlebars
├── public/
│   ├── CSS/
│   │   └── style.css
│   └── js/
│       └── client.js
├── sass/
│   └── style.scss
├── app.js      // Configuración de Express, Handlebars y Socket.IO
└── server.js   // Inicialización / levantado del servidor
```

---

## Funcionalidades principales

* CRUD completo de **productos** (`/api/products`)
* Gestión básica de **carritos** (`/api/carts`)
* Vista en tiempo real `/api/views/realtimeproducts` con Socket.IO:

  * Agregar productos sin recargar la página.
  * Eliminar productos desde la interfaz.
  * Actualización instantánea a todos los clientes conectados.
* Estilos con **Sass**: cuadrícula 3x∞ (3 columnas responsive).
* Notificaciones y confirmaciones con **SweetAlert2** (soporta HTML para poner el nombre en negrita).
* Persistencia en `src/data/products.json` y `src/data/carts.json`.

---

## Endpoints

### Productos (`/api/products`)

* `GET /api/products` — Listar todos los productos.
* `GET /api/products/:pid` — Obtener producto por ID.
* `POST /api/products` — Crear un producto.
* `PUT /api/products/:pid` — Actualizar producto por ID.
* `DELETE /api/products/:pid` — Eliminar producto por ID.

**Ejemplo body para POST /api/products**

```json
{
  "title": "Camiseta",
  "description": "Camiseta 100% algodón",
  "code": "CAM123",
  "price": 25.99,
  "status": true,
  "stock": 50,
  "category": "Ropa",
  "thumbnails": "https://ejemplo.com/img.jpg"
}
```

### Carritos (`/api/carts`)

* `POST /api/carts` — Crear un nuevo carrito.
* `GET /api/carts/:cid` — Obtener carrito por ID.
* `POST /api/carts/:cid/product/:pid` — Agregar producto al carrito.

### Vistas / Web

* `GET /api/views/realtimeproducts` — Vista en tiempo real con Socket.IO.
* `GET /` — Página home (estática).

---

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <repo>
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar en modo desarrollo (compila Sass y reinicia con nodemon en paralelo)

```bash
npm run dev
```

4. (Opcional) Ejecutar solo Sass watch

```bash
npm run sass-watch
```

5. (Opcional) Ejecutar solo nodemon watch

```bash
npm run nodemon-watch
```

6. Iniciar el servidor manualmente

```bash
npm start
```

7. Abrir en el navegador

```
Home:     http://localhost:8080/
Realtime: http://localhost:8080/api/views/realtimeproducts
API:      http://localhost:8080/api/products
```

---

## Uso rápido / pruebas

1. Abre `http://localhost:8080/api/views/realtimeproducts` en **dos pestañas**.
2. Agrega un producto desde el formulario: ambos clientes verán el nuevo producto instantáneamente.
3. Click en **Eliminar** y confirma en la alerta de SweetAlert2: el producto desaparecerá en ambas pestañas.

---

## Notas técnicas relevantes

* **Socket.IO** está inicializado en `app.js` y también se comparte en la app (`app.set('io', io)`) para poder emitir desde rutas si se desea.
* El cliente (`public/js/client.js`):

  * Escucha `socket.on('products', ...)` para renderizar la lista.
  * Emite `addProduct` y `deleteProduct`.
  * Muestra alertas con **SweetAlert2** (puedes usar `html: '<strong>Nombre</strong>'` para negrita).
* **Sass**: el archivo fuente está en `src/sass/style.scss`. Compílalo a `src/public/css/style.css`.
* Persistencia: `ProductManager` y `CartManager` usan `fs` para leer/escribir JSON. Asegúrate de permisos de escritura en `src/data`.

---

## Buenas prácticas / recomendaciones

* Migrar la persistencia a una base de datos (MongoDB, PostgreSQL) para producción.
* Agregar validación y saneamiento de entradas (por ejemplo `express-validator`).
* Añadir autenticación/autorización para las rutas que modifiquen datos.
* Implementar paginación y filtros en la API y en la vista si la cantidad de productos crece.

---
## Licencia

Proyecto para fines educativos. Puedes reutilizar y adaptar el código citando al autor.

=======
# Proyecto: API RESTful de Productos y Carritos con WebSockets

**Autor:** Gabriel Rodriguez
**Curso:** Backend - Coderhouse Segunda entrega

---

## Descripción

Servidor backend en **Node.js + Express** que expone una API RESTful para gestionar **productos** y **carritos**, con persistencia en archivos `.json`.
Incluye una interfaz de usuario con **Handlebars** y actualización en **tiempo real** mediante **Socket.IO**: la vista `realTimeProducts` permite agregar y eliminar productos y refleja los cambios instantáneamente en todos los clientes conectados. Los estilos están hechos con **Sass** y las notificaciones con **SweetAlert2**.

---

## Tecnologías

* Node.js, Express
* JavaScript (ES6)
* Handlebars (templates)
* Socket.IO (WebSockets)
* File System (`fs`) para persistencia en JSON
* Sass para estilos (`/src/sass/style.scss`)
* SweetAlert2 para alertas

---

## Estructura del proyecto

```
/src
├── controllers/
│   ├── products.controller.js
│   └── carts.controller.js
├── models/
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/
│   ├── products.router.js
│   ├── carts.router.js
│   └── views.router.js
├── data/
│   ├── products.json
│   └── carts.json
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── index.handlebars
│   └── realTimeProducts.handlebars
├── public/
│   ├── CSS/
│   │   └── style.css
│   └── js/
│       └── client.js
├── sass/
│   └── style.scss
├── app.js      // Configuración de Express, Handlebars y Socket.IO
└── server.js   // Inicialización / levantado del servidor
```

---

## Funcionalidades principales

* CRUD completo de **productos** (`/api/products`)
* Gestión básica de **carritos** (`/api/carts`)
* Vista en tiempo real `/api/views/realtimeproducts` con Socket.IO:

  * Agregar productos sin recargar la página.
  * Eliminar productos desde la interfaz.
  * Actualización instantánea a todos los clientes conectados.
* Estilos con **Sass**: cuadrícula 3x∞ (3 columnas responsive).
* Notificaciones y confirmaciones con **SweetAlert2** (soporta HTML para poner el nombre en negrita).
* Persistencia en `src/data/products.json` y `src/data/carts.json`.

---

## Endpoints

### Productos (`/api/products`)

* `GET /api/products` — Listar todos los productos.
* `GET /api/products/:pid` — Obtener producto por ID.
* `POST /api/products` — Crear un producto.
* `PUT /api/products/:pid` — Actualizar producto por ID.
* `DELETE /api/products/:pid` — Eliminar producto por ID.

**Ejemplo body para POST /api/products**

```json
{
  "title": "Camiseta",
  "description": "Camiseta 100% algodón",
  "code": "CAM123",
  "price": 25.99,
  "status": true,
  "stock": 50,
  "category": "Ropa",
  "thumbnails": "https://ejemplo.com/img.jpg"
}
```

### Carritos (`/api/carts`)

* `POST /api/carts` — Crear un nuevo carrito.
* `GET /api/carts/:cid` — Obtener carrito por ID.
* `POST /api/carts/:cid/product/:pid` — Agregar producto al carrito.

### Vistas / Web

* `GET /api/views/realtimeproducts` — Vista en tiempo real con Socket.IO.
* `GET /` — Página home (estática).

---

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <repo>
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar en modo desarrollo (compila Sass y reinicia con nodemon en paralelo)

```bash
npm run dev
```

4. (Opcional) Ejecutar solo Sass watch

```bash
npm run sass-watch
```

5. (Opcional) Ejecutar solo nodemon watch

```bash
npm run nodemon-watch
```

6. Iniciar el servidor manualmente

```bash
npm start
```

7. Abrir en el navegador

```
Home:     http://localhost:8080/
Realtime: http://localhost:8080/api/views/realtimeproducts
API:      http://localhost:8080/api/products
```

---

## Uso rápido / pruebas

1. Abre `http://localhost:8080/api/views/realtimeproducts` en **dos pestañas**.
2. Agrega un producto desde el formulario: ambos clientes verán el nuevo producto instantáneamente.
3. Click en **Eliminar** y confirma en la alerta de SweetAlert2: el producto desaparecerá en ambas pestañas.

---

## Notas técnicas relevantes

* **Socket.IO** está inicializado en `app.js` y también se comparte en la app (`app.set('io', io)`) para poder emitir desde rutas si se desea.
* El cliente (`public/js/client.js`):

  * Escucha `socket.on('products', ...)` para renderizar la lista.
  * Emite `addProduct` y `deleteProduct`.
  * Muestra alertas con **SweetAlert2** (puedes usar `html: '<strong>Nombre</strong>'` para negrita).
* **Sass**: el archivo fuente está en `src/sass/style.scss`. Compílalo a `src/public/css/style.css`.
* Persistencia: `ProductManager` y `CartManager` usan `fs` para leer/escribir JSON. Asegúrate de permisos de escritura en `src/data`.

---

## Buenas prácticas / recomendaciones

* Migrar la persistencia a una base de datos (MongoDB, PostgreSQL) para producción.
* Agregar validación y saneamiento de entradas (por ejemplo `express-validator`).
* Añadir autenticación/autorización para las rutas que modifiquen datos.
* Implementar paginación y filtros en la API y en la vista si la cantidad de productos crece.

---
## Licencia

Proyecto para fines educativos. Puedes reutilizar y adaptar el código citando al autor.

>>>>>>> d3781be (Entrega final CursoCoderBackend1)
