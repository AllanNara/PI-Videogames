import React, { useEffect, useState } from "react";
import { getVideogames, stateError, isLoading, getAllGenres } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Card from "./Card";
import Pagination from "./Pagination";

export default function Main() {
    const games = useSelector(state => state.allVideogames);
    const loading = useSelector(state => state.stateLoading);
    const generes = useSelector(state => state.allGenres);
    const error = useSelector(state => state.errorExist);
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        sort: 'rating',
        isData: 'all',
        genresInclude: []
    });
    const [pagination, setPagination] = useState({
        current: 1,
        total: 15
    });

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getAllGenres())
        return () => {
            dispatch(stateError(false))
        }
    }, [dispatch]);
    
    const dataBase = games.find(g => g.isDataBase === true)
    
    let existInDB = 1
    const render = []
    games.forEach(game => {
        if(sortByGenre(game.genres, filter.genresInclude)) {
            render.push(game)
        }
        existInDB = render.find(exist => exist.isDataBase)
    });

    const maxPages = render.length / pagination.total
    console.log(maxPages)

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
        // console.log(e.target.value)
        // console.log(e.target.name)
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
    
    const resetValues = () => {
        if(
            filter.sort !== 'rating' ||
            filter.isData !== 'all' ||
            filter.genresInclude.length
        ) return window.location.reload()
    };
    
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

    if(existInDB === undefined && filter.isData === '1' || !render.length && filter.genresInclude.length) {
        var notFound = <h2>No se encontraron resultados para tu busqueda</h2>
    }
        
    // if(!gamesByGenres.length && filter.genresInclude.length) {
    //     var notFound = <h2></>
    // }


    // const render = filterState.length ? filterState : games
    // const render = gamesByGenres

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
                <div>
                    <form>
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
                        {/* ACA SE MUESTRAN LOS RESULTADOS EN GENEROS */}
                        <div>
                            {filter.genresInclude.length ? 
                            filter.genresInclude.map(gnr =>
                            <span key={keyForChild.next().value}>
                            <button value={gnr} name='genresInclude' onClick={removeItem}>
                                <span style={{color: 'blue'}}>X</span> {gnr}
                            </button>
                            </span>)
                            : null}
                        </div>     
                        {/* <input type="submit" value="Buscar" /> */}
                    </form>               
                </div>
            <button onClick={resetValues}>Resetear valores</button>



            {/* ENTRA A RENDERIZAR LOS COMPONENTES SEGUN LOS RESULTADOS */}
        </div>
        {
        loading ?
            <span>Loading...</span> 
        : error ? 
            <div>
                <h1>Hmm... Hubo un error al cargar el contenidos</h1>
                <h3>Pruebe refrescando la pagina en unos minutos</h3>
            </div>
        : filter.isData !== 'all' ?
            filter.isData === '1' && !dataBase ?
                <h3>No se encontraron juegos agregados...</h3>
            :
            render.map(game => {
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
            :
            render.map(game => 
                <Card 
                    name={game.name} 
                    genres={game.genres} 
                    img={game.image} 
                    id={game.id}
                    key={game.id}
                />
            )}
            { notFound? notFound : null }
            <Pagination/>
        </>
    )
}