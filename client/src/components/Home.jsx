import React, { useEffect, useState } from "react";
import { getVideogames, stateError, getAllGenres } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Card from "./Card";
import Pagination from "./Pagination";
import Load from "./Load";
import fn from "./controllers"
import './styles/Home.css';
import HomeBarFilter from "./HomeBarFilter";

export default function Main() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.allVideogames);
    const genres = useSelector(state => state.allGenres);
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist);
    const pagination = useSelector(state => state.pagination);
    const gamesPerPag = useSelector(state => state.gamesPerPag);
    const [filter, setFilter] = useState({
        sort: 'rating',
        isData: 'all',
        genresInclude: []
    });

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getAllGenres());
        return () => {
            dispatch(stateError(false));
        }
    }, [dispatch]);

    let existInDB = 1;
    const preRender = [];

    games.forEach(game => {
        if(fn.sortByGenre(game.genres, filter.genresInclude)) preRender.push(game);
        existInDB = preRender.find(exist => exist.isDataBase)
    });

    if((existInDB === undefined && filter.isData === '1') ||
     (!preRender.length && filter.genresInclude.length)) {
        var notFound = <h2>No se encontraron resultados para tu busqueda</h2>
    };

    const render = filter.isData !== 'all'? preRender.filter(game =>
        game.isDataBase === !!parseInt(filter.isData)
    ) : preRender;
;
    return (
        <>
        <HomeBarFilter filter={filter} setFilter={setFilter} genres={genres} />
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
        {render
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
        </>
    )
}