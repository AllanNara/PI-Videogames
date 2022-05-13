import React from 'react';
import { NavLink } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import './styles/NavBar.css'

export default function NavBar() {
    return (
        <div className='top'>
            <SearchBar />
            <div className='nav-bar'>
                <nav>
                    <ul className='nav-list'>
                        <NavLink className="link-bar" to ='/home'>
                            <li>Home</li>
                        </NavLink>
                        <NavLink className="link-bar" to ='/home/create'>
                            <li>Agregar juego</li>
                        </NavLink>
                    </ul>
                </nav >
            </div>
        </div>
    )
}