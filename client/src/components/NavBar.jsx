import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
import { SearchBar } from './SearchBar';

export default function NavBar() {
    return (
        <div className='crumbs'>
            <nav className='crumbs'>
                <ul>
                    <NavLink to ='/home'>
                        <li className='crumb'>-Home-</li>
                    </NavLink>
                <span className='crumb'>
                    <SearchBar />
                </span>
                    <NavLink to ='/home/create'>
                        <li className='crumb'>-New Game-</li>
                    </NavLink>
                </ul>
            </nav >
        </div>
    )
}