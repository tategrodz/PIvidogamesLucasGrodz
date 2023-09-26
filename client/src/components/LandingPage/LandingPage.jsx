import React from "react";
import {Link} from "react-router-dom";
import s from "./LandingPage.module.css"

export default function LandingPage() {

    return(
        <div className={s.divLP}>
            <div className={s.divTextBtn}>
                <h1 className={s.text}>Bienvenido a mi aplicacion  <br/>
                    de videojuegos
                </h1>
                
                <Link to = "/home">
                    <button className={s.btn}>INICIAR</button>
                </Link>
            </div>

        </div>
    )
}