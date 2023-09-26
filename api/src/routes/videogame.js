// Importar la biblioteca axios para realizar solicitudes HTTP
const axios = require ('axios');
// Importar los modelos Videogame y Genre desde el archivo '../db.js'
const { Videogame, Genre } = require('../db.js');
// Importar la clave de la API desde las variables de entorno
const { API_KEY } = process.env

// ---------------------- Para traer el videojuego que coincida con el id pasado ---------------------

// Definir una función asincrónica llamada getApiInfoById que recibe un ID como parámetro
const getApiInfoById = async function(id) {

    try {
        // Realizar una solicitud a la API RAWG para obtener información del videojuego con el ID proporcionado
        const urlData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        // Formatear la información relevante del videojuego
        const gamesData = {
            id: urlData.data.id,
            name: urlData.data.name,
            description: urlData.data.description_raw,
            image: urlData.data.background_image,
            released: urlData.data.released,
            rating: urlData.data.rating,
            platforms: urlData.data.platforms.map(p => p.platform.name),
            genres: urlData.data.genres.map(g => g.name)
        }

        return gamesData;

    } catch(error) {
        return null; // En caso de error, devuelve nulo
    }
}

// Definir una función asincrónica llamada getDbInfoById que recibe un ID como parámetro
const getDbInfoById = async function(id) {

    try {
        // Consultar la base de datos local para obtener información del videojuego con el ID proporcionado
        let dbInfo = await Videogame.findOne({
            where: {
                id: id
            },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        // Formatear la información relevante obtenida de la base de datos
        dbInfo = JSON.parse(JSON.stringify(dbInfo));
        dbInfo.genres = dbInfo.genres.map(g => g.name);
               
        return dbInfo;

    } catch(error) {
        return null; // En caso de error, devuelve nulo
    }
}

// Definir una función llamada getAllVideogamesById que recibe un ID como parámetro
const getAllVideogamesById = async function(id) {

    if (isNaN(id)) {
        // Si el ID no es un número, obtener información del videojuego desde la base de datos
        const dbInfoById = await getDbInfoById(id);
        return dbInfoById;
    } else {
        // Si el ID es un número, obtener información del videojuego desde la API
        const apiInfoById = await getApiInfoById(id);
        return apiInfoById;
    }
}

// ---------------------- Ruta para encontrar videojuego por id ------------------------

// Exportar una función llamada videoGameByIdRoute que maneja la ruta para encontrar un videojuego por ID
exports.videoGameByIdRoute = async function(req, res, next) {
    const { id } = req.params;

    // Obtener información del videojuego por ID utilizando la función getAllVideogamesById
    let videogamesById = await getAllVideogamesById(id);

    if(videogamesById != null) {
        // Si se encontró información del videojuego, responder con los datos y un código de estado 200 (Éxito)
        res.status(200).json(videogamesById);
    } else {
        // Si no se encontró información del videojuego, responder con un mensaje de error y un código de estado 404 (No Encontrado)
        res.status(404).send("Id not found");
    }
};

// ---------------------- Ruta para crear un videojuego ----------------------------

// Exportar una función llamada createVideoGameRoute que maneja la ruta para crear un nuevo videojuego
exports.createVideoGameRoute = async function(req, res, next) {
    const { name, description, released, rating, platforms, image, genres } = req.body;
    
    // Consultar la base de datos local para obtener información de géneros relacionados con el videojuego
    let getDbInfoGenres = await Genre.findAll({
        where: {
            name: genres
        }
    });

    // Verificar que se proporcionen los datos necesarios (nombre, descripción y plataformas) para crear un videojuego
    if(name && description && platforms) {
        // Crear un nuevo videojuego en la base de datos
        let newVideogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            image
        })

        // Asociar los géneros obtenidos de la base de datos al nuevo videojuego
        newVideogame.addGenres(getDbInfoGenres);
        
        // Responder con un mensaje de éxito
        return res.send("Videogame created successfully");
    }
};
