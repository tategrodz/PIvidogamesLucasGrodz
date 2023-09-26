import NavBar from "../Nav/Nav"
import s from "./About.module.css"
import linkedin from '../../images/linkedin.png';
import github from '../../images/github.png';
import logo_react from '../../images/react.png';
import logo_redux from '../../images/redux.png';
import logo_express from '../../images/express.png';
import logo_sequelize from '../../images/sequelize.png';
import logo_postgres from '../../images/postgres.png';

export default function About() {

    return(
        <div className={s.divGeneral}>
            
            <NavBar/>

            <div className={s.divDetail}>

            <img className={s.title_img} src="https://i0.wp.com/socialbarrel.com/wp-content/uploads/2015/04/video_games_awesome_sm3dl_logo_by_pokemon_diamond-d6p2vyu-min.png?fit=600%2C367&ssl=1" alt="VIDEOGAMES" width="150px"/>

                <p className={s.text}>
                  hola me llamo Lucas Julian Grodz y este es mi proyecto individual sobre videojuegos
                    <br/>
                    <br/>
                    Este es mi Proyecto Individual de Videojuegos consiste en una Aplicación de Página Única (SPA, por sus siglas en inglés). Obtenemos los datos de la API https://api.rawg.io/.
                    <br/>
                    <br/>
                    Esta es la base de datos de videojuegos más grande y un servicio de descubrimiento de juegos. Tiene paginación y también cuenta con la funcionalidad para buscar, filtrar, ordenar y crear videojuegos.
                    <br/>
                    <br/>
                    Esta aplicación fue desarrollada utilizando: Javascript, React, Redux, Node.js, Express, PostgreSQL, Sequelize y CSS puro.
                </p>
                <div className={s.conteiner_tecnologias}>
                    <img className={s.image_tecnologias} src={logo_react} alt="react" />
                    <img className={s.image_tecnologias} src={logo_redux} alt="redux" />
                    <img className={s.image_tecnologias} src={logo_express} alt="express" />
                    <img className={s.image_tecnologias} src={logo_sequelize} alt="sequelize" />
                    <img className={s.image_tecnologias} src={logo_postgres} alt="postgres" />
                </div> 
                <br></br>
                <div className={s.divRedes}>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/lucas-julian-grodz-a69580274/" className={s.redes}>
                        <img className={s.imagenL} src={linkedin} alt="img not found"/>
                        <p className={s.textRedes}>LinkedIn</p>
                    </a>
                    
                    <a target="_blank" rel="noreferrer" href="https://github.com/tategrodz" className={s.redes}>
                        <img className={s.imagenG} src={github} alt="img not found"/>
                        <p className={s.textRedes}>GitHub</p>
                    </a>
                </div>
                 
            </div>
           
        </div>
    )
}