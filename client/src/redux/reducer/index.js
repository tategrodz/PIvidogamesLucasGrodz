// El reducer recibe las acciones y modifica el estado.

// Define el estado inicial con las propiedades iniciales
const initialState = {
    videogames: [],         // Lista de videojuegos actualmente mostrados
    allVideogames: [],      // Todos los videojuegos disponibles
    genres: [],             // Lista de géneros de videojuegos
    detail: []              // Detalle de un videojuego seleccionado
}

// Reducer principal que maneja las acciones y actualiza el estado
function rootReducer(state = initialState, action) {
    switch (action.type) {
        // Actualiza la lista de videojuegos con los obtenidos del servidor
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload 
            }

        // Actualiza la lista de géneros con los obtenidos del servidor
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
            
        // Filtra los videojuegos por género seleccionado
        case 'FILTER_BY_GENRES':
            const allVideogames = state.allVideogames;
            const filteredGenre = action.payload === 'All' ? allVideogames : allVideogames.filter(v => v.genres?.find(v => v === action.payload));
            return {
                ...state,
                videogames: filteredGenre
            }
        
        // Filtra los videojuegos por origen (creados o de API)
        case 'FILTER_CREATED':
            const allVideogames2 = state.allVideogames;
            const filteredCreation = action.payload === 'Created' ? allVideogames2.filter(el => el.createdInDb) : allVideogames2.filter(el => !el.createdInDb);

            return {
                ...state,
                videogames: action.payload === 'All' ? allVideogames2 : filteredCreation
            }
        
        // Ordena los videojuegos alfabéticamente por nombre
        case 'ORDER_BY_NAME':
            let orderAsc = state.videogames.slice().sort((a, b) => {
                let videogameA = a.name.toLowerCase();
                let videogameB = b.name.toLowerCase();

                if (videogameA > videogameB) return 1;

                if (videogameB > videogameA) return -1;

                return 0;
            })

            const allVideogames3 = state.allVideogames;
            const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse();

            return {
                ...state,
                videogames: action.payload === '' ? allVideogames3 : orderName
            }
    
        // Ordena los videojuegos por calificación (rating)
        case 'ORDER_BY_RATING':
            let orderRatingAsc = state.videogames.slice().sort((a, b) => {
                if (Number(a.rating) > Number(b.rating)) return 1;

                if (Number(b.rating) > Number(a.rating)) return -1;

                return 0;
            })

            return {
                ...state,
                videogames: action.payload === 'asc' ? orderRatingAsc : orderRatingAsc.reverse()
            }

        // Actualiza la lista de videojuegos al buscar por nombre
        case 'GET_NAME_VIDEOGAMES':
            console.log('Reducer: GET_NAME_VIDEOGAMES - action:', action); // Agrega este console.log
            return {
                ...state,
                videogames: action.payload,
                name: action.name
            }

        // Actualiza el detalle de un videojuego seleccionado
        case 'GET_ID_VIDEOGAME':
            return {
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;
