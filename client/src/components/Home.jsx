import React, { useEffect } from "react";
import { getVideogames, stateError } from "../redux/action";
import { useDispatch, useSelector } from 'react-redux'
import Card from "./Card";
import { SearchBar } from './SearchBar';

export default function Main() {
    const games = useSelector(state => state.allVideogames);
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogames())
        return () => {
            dispatch(stateError(false))
        }
    }, [dispatch])
    
    // if(!games.length) {
    //     console.log(false)
    //     dispatch(getVideogames())
    // } else {
    //     console.log(true)
    // }

    
    return (
        <>
        <div>
         <h1>HOME</h1>
         <SearchBar />
        </div>
         {loading ? <span>Loading...</span> : 
            error ? 
            <div>
                <h1>Hmm... Hubo un error al cargar el contenidos</h1>
                <h3>Pruebe refrescando la pagina en unos minutos</h3>
            </div>
            :
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