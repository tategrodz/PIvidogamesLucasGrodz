import React from "react";
import s from "./OrderBy.module.css"

export default function OrderBy({handlerByName, handlerByRating, namechange, ratingchange}) {

    return (
        <div className={s.divSort}>

            <p className={s.titles}>ORDENAR POR</p>

            {/* Opciones de orden por nombre */}
            <div className={s.divName}>
                <h4 className={s.titles}>A-Z  Z-A</h4>
                <button onClick={e => {handlerByName("asc")}} className={s.btn}>
                        <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471085374/stock-vector-arrow-right-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
                <button onClick={e => {handlerByName("desc")}} className={s.btn}>
                    <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471116386/stock-vector-arrow-left-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
                <button onClick={e => {handlerByName("")}} className={s.btn}>
                    <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471209380/stock-vector-ban-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
            </div>

            {/* Opciones de orden por clasificación (rating) */}
            <div className={s.divRating}>
                <h4 className={s.titles}>1-5  5-1</h4>
                <button onClick={e => {handlerByRating("asc")}} className={s.btn}>
                            <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471085374/stock-vector-arrow-right-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
                <button onClick={e => {handlerByRating("desc")}} className={s.btn}>
                    <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471116386/stock-vector-arrow-left-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
                <button onClick={e => {handlerByName("")}} className={s.btn}>
                    <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471209380/stock-vector-ban-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
                </button>
            </div>
        </div>
    )

}
