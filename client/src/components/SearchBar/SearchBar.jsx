import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import s from "./SearchBar.module.css"

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    // Maneja el cambio en el campo de entrada de texto
    function handlerChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    // Maneja la búsqueda cuando se envía el formulario
    function handlerSubmit(e) {
        e.preventDefault();

        // Envía una solicitud de búsqueda con el nombre ingresado
        dispatch(getByName(name));

        // Limpia el campo de entrada de texto después de la búsqueda
        setName("");
    }

    return (
        <div className={s.formClass}>
            <form onSubmit={(e) => handlerSubmit(e)}>
                {/* Campo de entrada de texto */}
                <input
                    type="text"
                    placeholder="Buscar un videojuego..."
                    value={name}
                    onChange={(e) => handlerChange(e)}
                    className={s.input}
                />
                {/* Botón de búsqueda */}
                <button type="submit" className={s.btn}>
                    {/* Ícono de búsqueda */}
                    <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471010578/stock-vector-analytics-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
            </form>
        </div>
    )
}
