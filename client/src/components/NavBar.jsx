import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className='crumbs'>
            <ul>
                <NavLink to ='/home'>
                    <li className='crumb'>-Home-</li>
                </NavLink>
                <NavLink to ='/home/create'>
                    <li className='crumb'>-New Game-</li>
                </NavLink>
            </ul>
        </nav>
    )
}