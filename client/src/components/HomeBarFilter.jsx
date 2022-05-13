import React from "react";
import { isLoading, currentPage } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux';
import * as fn from "./controllers"


export default function HomeBarFilter({filter, setFilter}) {
    const loading = useSelector(state => state.stateLoading);
    const games = useSelector(state => state.allVideogames);
    const genres = useSelector(state => state.allGenres)
    const dispatch = useDispatch();
    
    function resetPages() {
        dispatch(currentPage(1))
    };

    const filterBy = (e) => {
        fn.filterOrigin(e, filter, dispatch, setFilter, isLoading, resetPages)
    };

    const sortResults = (e) => {
        fn.changeSort(e.target.value, games, dispatch, isLoading, setFilter, filter);
        resetPages();
    };

    const change = (e) => {
        fn.handleChangeHome(e, filter, dispatch, isLoading, setFilter, resetPages)
    };
    
    const remove = (e) => {
        fn.removeItemHome(e, dispatch, isLoading, setFilter, filter, resetPages)
    };


    return (
        <div className="home-bar-filter">
            <div>
                <label>Filtrar por origen:</label>
                <select 
                    name="isData"
                    onChange={filterBy} 
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
                        onChange={change} 
                        defaultValue={'DEFAULT'}
                        disabled={loading? true : false}
                    >
                    <option value="DEFAULT" disabled>Seleccionar</option>
                    {genres.length ? genres.map(gnr =>{
                        return <option key={gnr.id}>{gnr.name}</option>
                    }) : null}
                </select>
            </div>
                {/* ACA SE MUESTRAN LOS RESULTADOS EN GENEROS */}
            <div className="genres-items">
                {filter.genresInclude.length ? 
                filter.genresInclude.map(gnr =>
                <span key={fn.keyForChild.next().value}>
                <button value={gnr} name='genresInclude' onClick={remove}>
                    <span style={{color: 'blue'}}>X</span> {gnr}
                </button>
                </span>)
                : null}
            </div>
            <div>
                {
                filter.sort !== 'rating' ||
                filter.isData !== 'all' ||
                filter.genresInclude.length ? 
                <button className="reset-button" onClick={() => window.location.reload()}>
                    Limpiar
                </button> : null
                } 
            </div>
        </div>
    )
}