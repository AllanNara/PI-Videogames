import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVideogames } from '../redux/action';

export function SearchBar() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('');
    const gamesName = useSelector(state => state.gamesByName)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getVideogames(search));
        setSearch('')
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} >
            <input 
            type="search"
            value={search}
            placeholder="Search game by name"
            onChange={handleChange}

            />
            <Link to={`/home/search/${search}`}>
            <input 
            type="submit"
            value="Search"
            />            
            </Link>
        </form>       
    )
}