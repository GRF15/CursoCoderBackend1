# Proyecto: API RESTful de Productos y Carritos

## Primera Entrega - Backend

## Dejo por aquí la consigna dada (re-escrita) para la correcta evaluacion (Criterios de evaluación: https://drive.google.com/file/d/1erfOEyRRkxFKPqxXpcuocpeP6dTyzVWg/view?usp=drive_link):
### Entrega N° 1: API de Productos y Carritos
## Descripción General
## Desarrollar un servidor en Node.js y Express que exponga los endpoints necesarios para gestionar productos y carritos de compra.
## Configuración del Servidor
## Tecnología: Node.js + Express
## Puerto: 8080
## Rutas principales:
## /api/products
## /api/carts
## Endpoints para Productos (/api/products/)
## Método	Ruta	Función
## GET	/	Listar todos los productos.
## GET	/:pid	Obtener únicamente el producto cuyo id coincida con pid.
## POST	/	Agregar un nuevo producto.
## Campos:
# • id (Number/String) → autogenerado (no llega en el body).
# • title (String)
# • description (String)
# • code (String)
# • price (Number)
# • status (Boolean)
# • stock (Number)
# • category (String)
# • thumbnails (Array de Strings — rutas de imagen).
## PUT	/:pid	Actualizar campos del producto con id = pid. No se modifica ni elimina el id.
## DELETE	/:pid	Eliminar el producto cuyo id sea pid.
## Endpoints para Carritos (/api/carts/)
## Método	Ruta	Función
## POST	/	Crear un nuevo carrito.
## Estructura:
# • id (Number/String) → autogenerado.
# • products (Array de objetos — cada uno representa un producto con product y quantity).
## GET	/:cid	Listar todos los productos en el carrito con id = cid.
## POST	/:cid/product/:pid	Agregar un producto al carrito cid.
# • product: solo el ID del producto.
# • quantity: número de unidades (si ya existe en el carrito, incrementar quantity).
## Persistencia de Datos
## Se utilizarán archivos JSON:
## products.json
## carts.json
## Acceso mediante el módulo fs.
## Emplear la clase ProductManager (desafío anterior) y crear CartManager.
## Formato del Entregable
## Repositorio en GitHub con todo el proyecto.
## Excluir la carpeta node_modules.
## Nota
## No se requiere interfaz gráfica. Todas las operaciones pueden probarse con Postman u otro cliente HTTP.









### Descripción

Este proyecto consiste en el desarrollo de un servidor backend utilizando **Node.js** y **Express**, que implementa una API RESTful para el manejo de productos y carritos de compra. Los datos se almacenan en archivos `.json` utilizando el módulo `fs` para asegurar persistencia.

### Tecnologías Utilizadas

* Node.js
* Express.js
* JavaScript ES6
* File System (`fs`)

### Estructura de Carpetas

```
/src
├── controllers/          # Lógica de negocio
│   ├── products.controller.js
│   └── carts.controller.js
├── models/               # Manejo de datos con persistencia
│   ├── ProductManager.js
│   └── CartManager.js
├── routes/               # Rutas de la API
│   ├── products.router.js
│   └── carts.router.js
├── data/                 # Archivos JSON persistentes
│   ├── products.json
│   └── carts.json
├── app.js                # Configuración de la app
└── server.js             # Inicialización del servidor
/public                   # (Opcional) Imágenes para thumbnails
```

### Endpoints

#### Productos `/api/products/`

* `GET /` - Listar todos los productos.
* `GET /:pid` - Obtener un producto por ID.
* `POST /` - Crear un nuevo producto.
* `PUT /:pid` - Actualizar un producto por ID.
* `DELETE /:pid` - Eliminar un producto por ID.

#### Carritos `/api/carts/`

* `POST /` - Crear un nuevo carrito.
* `GET /:cid` - Obtener un carrito por ID.
* `POST /:cid/product/:pid` - Agregar un producto al carrito.

### Requisitos Funcionales Cumplidos

* CRUD de productos y carritos.
* Rutas separadas y bien organizadas con Express Router.
* Persistencia de datos en archivos `.json` mediante `fs`.
* Autogeneración de `id` para productos y carritos.
* Manejo adecuado de errores (404, 500).

### Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone <url-del-repo>
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el servidor:

```bash
node src/server.js
```

4. La API estará disponible en:

```
http://localhost:8080/api/products
http://localhost:8080/api/carts
```

### Observaciones

* Los datos se almacenan en `src/data/products.json` y `carts.json`.
* Las rutas son completamente funcionales y siguen el modelo REST.
* El proyecto está preparado para escalar hacia uso de bases de datos en futuras entregas.

---

**Autor:** Gabriel Rodriguez
**Curso:** Backend - Coderhouse
**Entrega:** Primera entrega (API con Express y persistencia en archivos)



