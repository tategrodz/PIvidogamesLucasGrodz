import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../redux/actions";
import NavBar from "../Nav/Nav";
import Card from "../Card/Card";
import Paginado from "../Pagination/Pagination";
import Filters from "../Filters/Filters";
import OrderBy from "../OrderBy/OrderBy";
import { filterByGenres, filterByCreated } from "../../redux/actions";
import { orderByName, orderByRating } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from "./Home.module.css";
import imgDefault from "../../images/imgDefault.png";

export default function Home() {

    let dispatch = useDispatch();

    const allVideogames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const [source, setSource] = useState("All");
    const [namechange, setNamechange] = useState('');
    const [ratingchange, setRatingchange] = useState('');
    const [genrechange, setGenrechange] = useState('');
    const [, setOrder] = useState()
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        // Obtener todos los videojuegos al montar el componente
        dispatch(getAllVideogames());
    }, [dispatch]);

    function handleClickReset(e) {
        e.preventDefault();
        dispatch(getAllVideogames());
        setNamechange("");
        setRatingchange("");
        setGenrechange("")
        setCurrentPage(1);
        setSource("All");
    }

    function handlerGenres(e) {
        e.preventDefault();
        // Filtrar por género
        dispatch(filterByGenres(e.target.value));
        setCurrentPage(1);
        setSource("All");
        setGenrechange(e.target.value);
        setOrder("Order" + e.target.value)
    }
    
    function handlerCreated(e) {
        // Filtrar por fuente (Created, Api, All)
        dispatch(filterByCreated(e));
        setSource(e);
        setCurrentPage(1);
        setGenrechange("");
        setOrder("Order" + e)
    }

    function handlerByName(e) {
        // Ordenar por nombre
        dispatch(orderByName(e))
        setCurrentPage(1);
        setRatingchange("");
        setNamechange(e);                      
        setOrder("Order" + e) 
    }

    function handlerByRating(e) { 
        // Ordenar por clasificación (rating)
        dispatch(orderByRating(e));
        setCurrentPage(1);   
        setNamechange("");                   
        setRatingchange(e); 
        setOrder("Order" + e); 
    }

    return (
        <div>
            <NavBar/>
            <div className={s.divTwoColum}>
                <div className={s.firstColum}>
                    <OrderBy handlerByName={handlerByName} handlerByRating={handlerByRating} namechange={namechange} ratingchange={ratingchange}/>
                    <Filters handlerGenres={handlerGenres} handlerCreated={handlerCreated} source={source} genrechange={genrechange}/>
                    <button onClick={e => {handleClickReset(e)}} className={s.btn}>
                        <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471046072/stock-vector-bottom-green-yellow-modern-vector-icon-logo?token=' alt="RESET"/>
                    </button>
                </div>
                <div className={s.secondColum}>
                    <br></br>
                    <img className={s.title_img} src='https://i0.wp.com/socialbarrel.com/wp-content/uploads/2015/04/video_games_awesome_sm3dl_logo_by_pokemon_diamond-d6p2vyu-min.png?fit=600%2C367&ssl=1' alt="VIDEOGAMES" width="150px"/>
                    <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado} currentPage={currentPage}/>
                    
                    <div className={s.home}>
                        <Link to='/'>
                            <button className={s.btnLeave}>
                                <img className={s.exit_img} src="https://cdn.create.vista.com/api/media/medium/470956852/stock-vector-athlete-running-green-yellow-modern-vector-icon-logo?token=" alt="VIDEOGAMES" width="150px"/>
                            </button>
                        </Link>
                        <p id="mensaje" className={s.message}></p>
                        {currentVideogames.length > 0 ?
                        <div className={s.divCards}>
                            {currentVideogames.map( el => {
                                return (
                                    <div key={el.id}>
                                        <Card name={el.name} genres={el.genres} image = {el.image ? el.image : imgDefault} rating={el.rating} id={el.id} createdInDb={el.createdInDb}/>
                                    </div>
                                );
                            })}
                        </div> 
                        : 
                        <div className={s.divLoading}>
                            <img className={s.loading} src="https://i.gifer.com/YCZH.gif" alt="Img not found" width="150px"/>                            
                        </div>}
                        
                    </div>
                    <Paginado videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginado={paginado} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    )
}
