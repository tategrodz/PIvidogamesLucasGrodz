import React from 'react';
import SearchBar from '../SearchBar/SearchBar'
import s from './Nav.module.css';
import { Link } from 'react-router-dom';

export default function NavBar ({onSearch}) {
    return (
        <nav className={s.nav}>

            <Link to='/home'>
                <img className={s.imgs} src='https://cdn.create.vista.com/api/media/medium/471172296/stock-vector-bird-home-small-hole-green-yellow-modern-vector-icon-logo?token=' alt="HOME"/>
            </Link>

            <SearchBar />

            <Link to='/create'>
                <img className={s.imgs_crt} src='https://cdn.create.vista.com/api/media/medium/471104704/stock-vector-add-interface-circular-symbol-sign-green-yellow-modern-vector-icon?token=' alt='CREATE'></img>
            </Link>

            <Link to='/about'>
                <img className={s.imgs_about} src='https://cdn.create.vista.com/api/media/medium/470863590/stock-vector-bald-head-question-mark-green-yellow-modern-vector-icon-logo?token=' alt='ABOUT'></img>
            </Link>


        </nav> 
    )
}