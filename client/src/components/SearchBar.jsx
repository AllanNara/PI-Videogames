import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './SearchBar.css'

export function SearchBar() {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <form 
        className='form'
        >
            <div className='search'>
            <input
            type="search"
            value={search}
            placeholder="Buscar juego..."
            onChange={handleChange}
            className='input'
            />
            <Link to={`/home/search/${search}`}>
            <input 
            type="submit"
            value="Buscar"
            className='button-input'
            />            
            </Link>
            </div>
        </form>       
    )
}