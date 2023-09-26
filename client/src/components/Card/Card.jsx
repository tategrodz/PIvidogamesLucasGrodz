import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";
import { deleteVideogame } from "../../redux/actions";
import { getAllVideogames } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Card({name, genres, image, rating, id, createdInDb}) {

    // Obtener el dispatcher de Redux para despachar acciones
    let dispatch = useDispatch();
      
    // Manejar el clic en el botón de eliminación de videojuego
    function handlerClickDelete(id) {
        // Mostrar un mensaje de confirmación
        document.getElementById("mensaje").style.opacity = 1;
        let mensaje;
        var opcion = window.confirm("Are you sure you want to delete this? ");
        if (opcion === true) {
            // Si el usuario confirma, despachar la acción para eliminar el videojuego
            dispatch(deleteVideogame(id));
            // Actualizar la lista de videojuegos después de eliminar
            dispatch(getAllVideogames());
            mensaje = "The videogame has been deleted successfully";
            document.getElementById("mensaje").style.marginLeft = "23%";
            document.getElementById("mensaje").style.backgroundColor = "green";
        } else {
            mensaje = "The videogame is safe";
            document.getElementById("mensaje").style.marginLeft = "35%";
            document.getElementById("mensaje").style.backgroundColor = "red";
        }
        document.getElementById("mensaje").innerHTML = mensaje;
        // Ocultar el mensaje después de un tiempo
        window.setTimeout(function() {
            document.getElementById("mensaje").style.opacity = 0.0;
        },2000);
    }

    return (
        <div className={s.div}>
            {/* Enlace a la página de detalles del videojuego */}
            <Link to={`/videogame/${id}`}>
                <h3 className={s.title}>Juego: <br /> {name}</h3>
            </Link>
            <Link to={`/videogame/${id}`}>
                <img className={s.imgs} src={image} alt="img not found"/>
            </Link>
            <div className={s.afterImg}>
                <p className={s.text}>Generos: {genres.join(", ")}</p>
                {/* Mostrar el rating con un fondo de colores según el valor */}
                <p className={s.rating} style={
                    rating < 1
                    ? { backgroundColor: "rgb(255, 77, 91)" }
                    : rating < 4
                    ? { backgroundColor: "rgb(253, 158, 81)" }
                    : { backgroundColor: "rgb(4, 201, 4)" }
                    }>
                    ⭐{rating}
                </p>
            </div>
            <br></br>
            <div>
                {
                    createdInDb === true ? 
                    // Mostrar el botón de eliminación si el videojuego se creó en la base de datos
                    <button className={s.btnDelete} onClick={() => handlerClickDelete(id)}>
                         <img className={s.imgs_delete} src="https://cdn.create.vista.com/api/media/medium/470871882/stock-vector-bin-green-yellow-modern-vector-icon-logo?token=" alt="VIDEOGAMES" width="150px"/>
                    </button>
                    : undefined
                }     
            </div>
        </div>
    )
}