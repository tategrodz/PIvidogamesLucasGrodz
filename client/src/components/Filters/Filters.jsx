import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import s from "./Filters.module.css"

export default function Filters({handlerGenres, handlerCreated, genrechange}) {

    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);

    useEffect(() => {
        // Obtener los géneros disponibles al montar el componente
        dispatch(getGenres());
    }, [dispatch]);

    return (
        <div className={s.divSourceGenres}>
            <div className={s.divSource}>
                <p className={s.titles}>FUENTES</p>

                <div className={s.divSource}>
                    {/* Botones para filtrar por fuente (Created, Api, All) */}
                    <button className={s.source} onClick={() => handlerCreated('Created')}>
                        <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/470992446/stock-vector-add-file-green-yellow-modern-vector-icon-logo?token=' alt="ALL"/>
                    </button>
                    <button className={s.source} onClick={() => handlerCreated('Api')}>
                        <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471095392/stock-vector-big-data-green-yellow-modern-vector-icon-logo?token=' alt="ALL"/>
                    </button>
                    <button className={s.source} onClick={() => handlerCreated('All')} >
                        <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/470794104/stock-vector-book-green-yellow-modern-vector-icon-logo?token=' alt="ALL"/>
                    </button>
                </div>
            </div>

            <div>
                <p className={s.titles}>GENEROS</p>

                {/* Selector para filtrar por género */}
                <select value={genrechange} onChange={(e) => handlerGenres(e)} className={s.select}>
                    <option value=''>--Select--</option>
                    <option value='All'>All</option>
                    {
                        genres && genres.map(g => (
                            <option value={g.name} key={g.id}>{g.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
