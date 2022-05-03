import React, { useEffect } from "react";
import { getVideogames } from "../redux/action";
import { useSelector, useDispatch } from 'react-redux'
import Card from "./Card";

export default function Main() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.allVideogames);

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    return (
        <>
         <h1>HOME</h1>
            {games.map(game => 
                <Card 
                    name={game.name} 
                    genres={game.genres} 
                    img={game.image} 
                    id={game.id}
                    key={game.id}
                />
            )}
        </>
    )
}