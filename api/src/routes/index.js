// Importar el objeto Router desde Express para definir rutas
const { Router } = require('express');

// Importar las rutas y controladores necesarios desde otros archivos
const { videoGamesRoute, deleteVideoGameRoute } = require('./videogames');
const { videoGameByIdRoute, createVideoGameRoute } = require('./videogame');
const genresRoute = require('./genres');

// Crear un nuevo objeto Router para manejar las rutas
const router = Router();

// Definir las rutas GET y POST utilizando los controladores importados

// Rutas GET
router.get('/videogames', videoGamesRoute); // Ruta para obtener todos los videojuegos o buscar por nombre
router.get('/videogames/:id', deleteVideoGameRoute); // Ruta para eliminar un videojuego por ID
router.get('/videogame/:id', videoGameByIdRoute); // Ruta para obtener un videojuego por ID
router.get('/genres', genresRoute); // Ruta para obtener todos los géneros de videojuegos

// Ruta POST para crear un nuevo videojuego
router.post('/videogames', createVideoGameRoute);

// Exportar el objeto Router configurado con las rutas
module.exports = router;