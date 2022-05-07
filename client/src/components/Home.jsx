import React, { useEffect, useRef, useState } from "react";
import { getVideogames, stateError, isLoading } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Card from "./Card";
import { SearchBar } from './SearchBar';

export default function Main() {
    const games = useSelector(state => state.allVideogames);
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        sort: 'rating',
        isData: 'all',
        genre: ''
    });

    useEffect(() => {
        dispatch(getVideogames())
        return () => {
            dispatch(stateError(false))
        }
    }, [dispatch]);
    
    function changeSort(data) {
        switch(data) {
            case 'A-Z':
                games.sort((a, b) => {
                    let nameA = a.name.toLowerCase().trim();
                    let nameB = b.name.toLowerCase().trim();
                    if(isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
                        if(nameA > nameB) return 1
                        if(nameA < nameB) return -1
                        return 0
                    }
                    if(!isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) return 1
                    if(isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return -1
                    if(!isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return nameA - nameB
                    return 0
                });
                setFilter({...filter, sort: 'A-Z'});
                break;
            case 'Z-A':
                games.sort((a, b) => {
                    let nameA = a.name.toLowerCase().trim();
                    let nameB = b.name.toLowerCase().trim();
                    if(isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) {
                        if(nameA < nameB) return 1
                        if(nameA > nameB) return -1
                        return 0
                    }
                    if(!isNaN(Number(nameA[0])) && isNaN(Number(nameB[0]))) return -1
                    if(isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return 1
                    if(!isNaN(Number(nameA[0])) && !isNaN(Number(nameB[0]))) return nameB - nameA
                    return 0
                });
                setFilter({...filter, sort: 'Z-A'});
                break;
            case 'rating':
                games.sort((a, b) => {
                    return b.rating - a.rating
                });
                setFilter({...filter, sort: 'rating'});
                break;
        };
    };

    const filterOrigin = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        console.log(e.target.name)
        if(e.target.value !== filter.isData) {
            dispatch(isLoading(true));
            setFilter({
                ...filter,
                isData: e.target.value
            });
            setTimeout(() => {dispatch(isLoading(false))}, 1000);
        };
    };
        
    const sortResults = (e) => {
        e.preventDefault();
        changeSort(e.target.value)
    };
    
    const resetValues = (e) => {
        if(
            filter.sort !== 'rating' ||
            filter.isData !== 'all' ||
            filter.genre !== ''
        ) return window.location.reload()
    };
    
    return (
        <>
        <div>
         <h1>HOME</h1>
        <label>Filtrar por origen:</label>
                <select 
                    name="isData"
                    onChange={filterOrigin} 
                    value={filter.isData}
                    disabled={loading? true : false}
                    >
                    <option value='all'>Todos</option>
                    <option value='1'>Creados</option>
                    <option value='0'>Ya existentes</option>
                </select> {" "}
        <label>Ordenar segun:</label>
                <select 
                    name="sort"
                    onChange={sortResults} 
                    value={filter.sort}
                    disabled={loading? true : false}
                    >
                    <option value='rating'>Mejor Rating</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
        <button onClick={resetValues}>Resetear valores</button>
        </div>
         {loading ? <span>Loading...</span> : 
            error ? 
            <div>
                <h1>Hmm... Hubo un error al cargar el contenidos</h1>
                <h3>Pruebe refrescando la pagina en unos minutos</h3>
            </div>
            : typeof filter.isData !== 'all' ?
            games.length ? 
            games.map(game => {
                if(game.isDataBase === !!parseInt(filter.isData)) {
                    return <Card 
                        name={game.name} 
                        genres={game.genres} 
                        img={game.image} 
                        id={game.id}
                        key={game.id}
                    />
                };
            })
            : <h1>Aun no existen juegos creados... </h1> :
            games.map(game => 
                <Card 
                    name={game.name} 
                    genres={game.genres} 
                    img={game.image} 
                    id={game.id}
                    key={game.id}
                />
            )
         }

        </>
    )
}