import React, { useEffect, useState } from "react";
import { getVideogames, stateError, isLoading, getAllGenres } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Card from "./Card";
import Pagination from "./Pagination";
import Load from "./Load";
import './Home.css';

export default function Main() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.allVideogames);
    const loading = useSelector(state => state.stateLoading);
    const generes = useSelector(state => state.allGenres);
    const error = useSelector(state => state.errorExist);
    const pagination = useSelector(state => state.pagination);
    const gamesPerPag = useSelector(state => state.gamesPerPag);
    const [filter, setFilter] = useState({
        sort: 'rating',
        isData: 'all',
        genresInclude: []
    });

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getAllGenres())
        return () => {
            dispatch(stateError(false))
        }
    }, [dispatch]);

    let existInDB = 1;
    const preRender = [];
    games.forEach(game => {
        if(sortByGenre(game.genres, filter.genresInclude)) {
            preRender.push(game)
        }
        existInDB = preRender.find(exist => exist.isDataBase)
    });

    function sortByGenre(object, includes) {
        for (let i = 0; i < includes.length; i++) {
            if(!object.includes(includes[i])) return false     
        }
        return true
    };

    function changeSort(data) {
        switch(data) {
            case 'A-Z':
                games.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
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
                dispatch(isLoading(true));
                setFilter({...filter, sort: 'A-Z'});
                setTimeout(() => {dispatch(isLoading(false))}, 600);
                break;
            case 'Z-A':
                games.sort((a, b) => {
                    let nameA = a.name.toLowerCase();
                    let nameB = b.name.toLowerCase();
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
                dispatch(isLoading(true));
                setFilter({...filter, sort: 'Z-A'});
                setTimeout(() => {dispatch(isLoading(false))}, 600);
                break;
            case 'rating':
                games.sort((a, b) => {
                    return b.rating - a.rating
                });
                dispatch(isLoading(true));
                setFilter({...filter, sort: 'rating'});
                setTimeout(() => {dispatch(isLoading(false))}, 600);
                break;
            default: break
        };
    };

    const filterOrigin = (e) => {
        e.preventDefault();
        if(e.target.value !== filter.isData) {
            dispatch(isLoading(true));
            setFilter({
                ...filter,
                isData: e.target.value
            });
            setTimeout(() => {dispatch(isLoading(false))}, 600);
        };
    };
        
    const sortResults = (e) => {
        e.preventDefault();
        changeSort(e.target.value)
    };

    const button_reset =
    filter.sort !== 'rating' ||
    filter.isData !== 'all' ||
    filter.genresInclude.length ? true : false
    
    const handleChange = (e) => {
        if(e.target.value !== 'DEFAULT' && !filter[e.target.name].includes(e.target.value)) {
            setFilter({
                ...filter,
                [e.target.name]: [...filter[e.target.name], e.target.value]
            });
            e.target.value = 'DEFAULT';
        };
    };

    const removeItem = (e) => {
        e.preventDefault()
        setFilter({
            ...filter,
            [e.target.name]: filter[e.target.name].filter(item => item !== e.target.value)
        })
    };

    function* generatorKey() {
        let number = 100000;
        while(true) {
            number++;
            yield number
        }
    };

    const keyForChild = generatorKey();

    if((existInDB === undefined && filter.isData === '1') ||
     (!preRender.length && filter.genresInclude.length)) {
        var notFound = <h2>No se encontraron resultados para tu busqueda</h2>
    };

    const render = filter.isData !== 'all'? preRender.filter(game =>
        game.isDataBase === !!parseInt(filter.isData)
    ) : preRender

    return (
        <>
        <div className="home-bar-filter">

            <div>
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
            </div>

            <div>
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
            </div>

            <div>
                <label>Buscar por generos</label>
                <select 
                        name="genresInclude" 
                        onChange={handleChange} 
                        defaultValue={'DEFAULT'}
                        disabled={loading? true : false}
                    >
                    <option value="DEFAULT" disabled>Seleccionar</option>
                    {generes.length ? generes.map(gnr =>{
                        return <option key={gnr.id}>{gnr.name}</option>
                    }) : null}
                </select>
            </div>
                {/* ACA SE MUESTRAN LOS RESULTADOS EN GENEROS */}
            <div className="genres-items">
                {filter.genresInclude.length ? 
                filter.genresInclude.map(gnr =>
                <span key={keyForChild.next().value}>
                <button value={gnr} name='genresInclude' onClick={removeItem}>
                    <span style={{color: 'blue'}}>X</span> {gnr}
                </button>
                </span>)
                : null}
            </div>
            <div>
                {
                button_reset ? 
                <button className="reset-button" onClick={() => window.location.reload()}>
                    Limpiar
                </button> : null
                } 
            </div>
        </div>



            {/* ENTRA A RENDERIZAR LOS COMPONENTES SEGUN LOS RESULTADOS */}
        {
        loading ?
            <Load/>
        : error ? 
            <div>
                <h1>Hmm... Hubo un error al cargar el contenidos</h1>
                <h3>Pruebe refrescando la pagina en unos minutos</h3>
            </div>
        :
        <div className='cards'>
{            render
            .slice(
                (pagination - 1) * gamesPerPag,
                (pagination - 1) * gamesPerPag + gamesPerPag
            )
            .map(game => 
                    <Card 
                        name={game.name} 
                        genres={game.genres} 
                        img={game.image} 
                        id={game.id}
                        key={game.id}
                    />
                )}
        </div>
        }
        {!loading ? notFound ? notFound : <Pagination amount={render.length}/> : null}
        {/* <footer> X </footer> */}
        </>
    )
}