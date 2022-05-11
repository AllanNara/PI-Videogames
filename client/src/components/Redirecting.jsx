import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Load from "./Load";

export function Redirecting() {
    const games = useSelector(state => state.createdGames)
    const history = useHistory()
    
    const redirection = games[games.length - 1]
    if(redirection !== undefined) {
        setTimeout(() => {history.push(`/home/videogame/${redirection}`)}, 1100)
    }

    return (
        <div>
            <h1>Juego creado con exito!!</h1>
            <h3>Espere unos segundos hasta ser redireccionado a los detalles del juego...</h3>
            <Load/>
        </div>
    )
}