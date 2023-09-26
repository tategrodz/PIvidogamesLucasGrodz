import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getById, clearVideogame } from "../../redux/actions";
import { useParams } from "react-router-dom";
import s from "./DetailVideogame.module.css";
import imgDefault from "../../images/imgDefault.png";

export default function Detail() {
    const { id } = useParams(); // Obtener el parámetro de la URL
    const dispatch = useDispatch();
    const detailVideogame = useSelector(state => state.detail); // Obtener los detalles del videojuego de Redux

    useEffect(() => {
        // Limpiar el detalle anterior y cargar los detalles del videojuego actual al montar el componente
        dispatch(clearVideogame());
        dispatch(getById(id));
    }, [dispatch, id]);

    return (
        <div>
            {
                detailVideogame.name ?
                <div className={s.divGeneral}>

                    <div className={s.div}>

                        <h1 className={s.title}>{detailVideogame.name}</h1> <hr className={s.hr}></hr>

                        <div className={s.divAllInfo}>
                            <div className={s.divImg}>
                                <img className={s.img} src={detailVideogame.image ? detailVideogame.image : imgDefault} alt="Img not found"/>
                            </div>
                            <div className={s.info}>
                                <p>{detailVideogame.description}</p>
                                <p>
                                    Publicado: <span>{detailVideogame.released}</span> 
                                </p>
                                <p>
                                Clasificacion: <span>{detailVideogame.rating}</span>
                                </p>
                                <p>
                                    Platformas: <span>{detailVideogame.platforms.length === 0 ? "Unspecified platform" : detailVideogame.platforms.join(", ")}</span>
                                </p>
                                <p>
                                    Generos: <span>{detailVideogame.genres.join(", ")}</span>
                                </p>
                            </div>
                        
                        </div>
                        <div className={s.divBack}> 
                            <Link to="/home">
                                <button className={s.btn}>
                                    <img className={s.imgs_dtl} src="https://cdn.create.vista.com/api/media/medium/471200176/stock-vector-back-arrow-green-yellow-modern-vector-icon-logo?token=" alt="VIDEOGAMES" width="150px"/>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div> 
                : 
                <div className={s.loading}>
                    <p>Cargando...</p>
                    <img  src="https://i.pinimg.com/originals/0a/d1/d7/0ad1d7cef24a77e15099915897edb089.gif" alt="Img not found"/>
                </div>
            }
        </div>
    )
}
