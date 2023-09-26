// Importar el modelo Genre desde el archivo '../db.js' y las bibliotecas necesarias
const { Genre } = require('../db.js');
const axios = require('axios');
const { API_KEY } = process.env;

// ---------------------- Para traer todos los géneros desde la API ----------------------------

// Definir una función asincrónica llamada getApiInfoGenres
const getApiInfoGenres = async function() {

    // Crear un array vacío para almacenar los datos de los géneros
    let gamesData = [];

    // Realizar una solicitud a la API RAWG para obtener la información de géneros
    const urlData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    // Iterar sobre los resultados de la API y agregarlos al array gamesData
    urlData.data.results.forEach(v => {
        gamesData.push({
            id: v.id,
            name: v.name,
        });
    });

    // Iterar sobre los datos de los géneros y almacenarlos en la base de datos local
    gamesData.forEach(el => {
        Genre.findOrCreate({
            where: {
                id: el.id,
                name: el.name,
            }
        });
    });
}

// ---------------------- Ruta para traer todos los géneros ----------------------------

// Exportar una función asincrónica que maneja la ruta
module.exports = async function(req, res, next) {

    // Llamar a la función getApiInfoGenres para obtener los datos de la API y almacenarlos en la base de datos
    await getApiInfoGenres();
       
    // Consultar todos los géneros almacenados en la base de datos
    const getDbInfoGenres = await Genre.findAll();

    // Enviar los datos de los géneros de la base de datos como respuesta a la solicitud
    res.send(getDbInfoGenres);
};
