// Importar los modelos Videogame y Genre desde el archivo '../db.js'
const { Videogame, Genre } = require('../db.js');
// Importar la constante Op desde 'sequelize' para realizar operaciones complejas en la base de datos
const { Op } = require('sequelize');
// Importar la biblioteca axios para realizar solicitudes HTTP
const axios = require ('axios');
// Importar la clave de la API y VIDEOGAMES_NUMBER desde las variables de entorno
const { API_KEY, VIDEOGAMES_NUMBER } = process.env

// ---------------------- Para traer todos los videojuegos de la API ----------------------------------

// Definir una función asincrónica llamada getApiInfo para obtener todos los videojuegos desde la API
const getApiInfo = async function() {

    let gamesData = [];

    for (let i = 1; i < 7; i++) {
        // Realizar múltiples solicitudes a la API RAWG para obtener datos de varios páginas
        gamesData.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`));
    }

    // Esperar a que todas las solicitudes se completen y luego procesar los resultados
    return Promise.all(gamesData)
        .then((response) => {
            let pages = [];
            let resultado = [];

            for (let i = 0; i < response.length; i++) {
                pages = [...pages, response[i].data.results];
            }
            pages.map(p => {
                p.forEach(v => {
                    resultado.push({
                        id: v.id,
                        name: v.name,
                        image: v.background_image,
                        rating: v.rating.toFixed(2),
                        genres: v.genres.map(g => g.name)
                    })
                })
            })

            return resultado;
        })
}

// Para traer todos los videojuegos de la base de datos ----------------------------------

// Definir una función asincrónica llamada getDbInfo para obtener todos los videojuegos desde la base de datos
const getDbInfo = async function() {

    let dbInfo = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });

    // Formatear la información obtenida de la base de datos
    dbInfo = JSON.parse(JSON.stringify(dbInfo));
    dbInfoModif = dbInfo.reverse();

    return dbInfoModif.map(videogame => {
        videogame.genres = videogame.genres.map(g => g.name);
        return videogame;
    })
}

// --------------------- Para traer todos los videojuegos (TANTO DE API COMO DE BD) ----------------------------------

// Definir una función asincrónica llamada getAllVideogames para obtener todos los videojuegos (API + BD)
const getAllVideogames = async function() {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
}

// Para traer los 15 primeros videojuegos que coincidan con el nombre pasado -----------------------

// Definir una función asincrónica llamada getApiInfoByName para obtener videojuegos por nombre desde la API
const getApiInfoByName = async function(name) {
    
    let gamesData = [];

    const urlData = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    urlData.data.results.forEach(v => {
        if(gamesData.length < VIDEOGAMES_NUMBER) {
            gamesData.push({
                id: v.id,
                name: v.name,
                description: v.description,
                image: v.background_image,
                released: v.released,
                rating: v.rating.toFixed(2),
                platforms: Array.isArray(v.platforms)?v.platforms.map(p => p.platform.name):"Unspecified platform",
                genres: v.genres.map(g => g.name)
        })}
    })

    return gamesData;
}

// Definir una función asincrónica llamada getDbInfoByName para obtener videojuegos por nombre desde la base de datos
const getDbInfoByName = async function(name) {
    let videoGames = await Videogame.findAll({
        where: {
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });

    // Formatear la información obtenida de la base de datos
    videoGames = JSON.parse(JSON.stringify(videoGames));
    videoGames = videoGames.reverse();
    
    return videoGames.map(videoGame => {
        videoGame.genres = videoGame.genres.map(g => g.name);
        return videoGame;
    });
}

// Definir una función asincrónica llamada getAllVideogamesByName para obtener videojuegos por nombre (API + BD)
const getAllVideogamesByName = async function(name) {
    const dbResults = await getDbInfoByName(name);
    const apiResults = await getApiInfoByName(name);
    const allResults = dbResults.concat(apiResults);
    return allResults.slice(0, VIDEOGAMES_NUMBER);
}

// ---------------------- Para dirigir a la ruta videogames ya sea con nombre o sin nombre ------------------------

// Exportar una función llamada videoGamesRoute que maneja la ruta para obtener videojuegos (con nombre o sin nombre)
exports.videoGamesRoute = async function (req, res, next) {
    const { name } = req.query;
    
    if (name) {
        // Si se proporciona un nombre en la consulta, obtener videojuegos por nombre
        let videogamesByName = await getAllVideogamesByName(name);
        
        if(videogamesByName.length <= 0) {
            res.status(404).send("No results");
        } else {
            // Responder con los videojuegos encontrados
            res.status(200).json(videogamesByName);
        }

    } else {
        // Si no se proporciona un nombre en la consulta, obtener todos los videojuegos
        let videogames = await getAllVideogames();
        res.status(200).send(videogames);
    }
};

// ---------------------- Ruta para eliminar un videojuego ----------------------------

// Exportar una función llamada deleteVideoGameRoute que maneja la ruta para eliminar un videojuego por ID
exports.deleteVideoGameRoute = async function(req, res, next) {
    const {id} = req.params;
    
    // Eliminar un videojuego de la base de datos por ID
    Videogame.destroy({
        where: {
            id: id
        }
    }).then(function(result) {
        if(result) {
            res.send("Videogame deleted");
        }
    })
}