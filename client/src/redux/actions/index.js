// Las acciones son un bloque de información que envían datos
// desde tu aplicación a tu store. Son la única fuente de información
// para tu store.

// Las action creators son funciones que crean acciones.

// La función dispatch se encarga de enviar las acciones a la store.

import axios from "axios";

// Obtiene todos los videojuegos desde el servidor
export function getAllVideogames() {
    return function(dispatch) {
        axios.get("/videogames")
            .then(response => {
                return dispatch({
                    type: 'GET_VIDEOGAMES',
                    payload: response.data
                })
            })
    }
}

// Obtiene videojuegos por nombre desde el servidor
export function getByName(name) {
    return function(dispatch) {
        console.log('Action: getByName - name:', name); // Agrega este console.log
        axios.get(`/videogames?name=${name}`)
            .then(response => {
                console.log('Action: getByName - response:', response.data); // Agrega este console.log
                return dispatch({
                    type: 'GET_NAME_VIDEOGAMES',
                    name,
                    payload: response.data
                })
            })
    }
}

// Obtiene un videojuego por su ID desde el servidor
export function getById(payload) {
    return function(dispatch) {
        axios.get(`/videogame/${payload}`)
            .then(response => {
                return dispatch({
                    type: 'GET_ID_VIDEOGAME',
                    payload: response.data
                })
            })
    }
}

// Limpia la información de un videojuego en el store
export function clearVideogame() {
    return function(dispatch) {
        return dispatch({
            type: 'GET_ID_VIDEOGAME',
            payload: []
        })
    }
}

// Crea un nuevo videojuego en el servidor
export function postVideogames(payload) {
    return function() {
        axios.post("/videogames", payload)
            .then(response => {
                return response
            })
    }
}

// Elimina un videojuego en el servidor
export const deleteVideogame = (id) => {
    return function() {
        axios.get(`/videogames/${id}`)
            .then(response => {
                return response
            })
    }  
}

// Obtiene los géneros de videojuegos desde el servidor
export function getGenres() {
    return function(dispatch) {
        axios.get("/genres")
            .then(response => {
                return dispatch({
                    type: 'GET_GENRES',
                    payload: response.data
                })
            })
    }
}

// Filtra videojuegos por género
export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}

// Filtra videojuegos por origen (Creados o de API)
export function filterByCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

// Ordena videojuegos por nombre
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

// Ordena videojuegos por rating
export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}
