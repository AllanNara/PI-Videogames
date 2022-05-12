import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearState, getGamesName, stateError } from "../redux/action";
import Card from "./Card";
import Load from "./Load";
import Pagination from "./Pagination";

export function SearchByName() {
    const dispatch = useDispatch();
    const games = useSelector(state => state.gamesByName);
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist);
    const pagination = useSelector(state => state.pagination);
    const gamesPerPag = useSelector(state => state.gamesPerPag);
    const { name } = useParams()

    useEffect(() => {
        dispatch(getGamesName(name));
        return () => {
            dispatch(clearState());
            dispatch(stateError(false))
        }
    }, [dispatch, name])


    return (
        <>
         {loading ? <Load /> :
            error ? 
            <div>
                <h1>Resultados de busqueda para "{name}"...</h1>
                <div>
                    <h4>Tu busqueda para "{name}" no arrojo resultados.</h4>
                    <p>Sugerencias:</p>
                    <ul>
                        <li>rebisa que el juego este bien escrivido y buelbe a hacer la intentacion :D</li>
                        <li>Quizas el juego que estas buscando no esta creado... Prueba crearlo tu mismo{" "}
                            <Link to ='/home/create'>
                                aqui
                            </Link> {"!!"} 
                        </li>
                        <li>Probablemente el juego no este en nuestra base de datos {`:(`}</li>
                    </ul>
                </div>
            </div> :
            <div>
                <h1 style={{margin: '50px 0'}}>Resultados de busqueda para "{name}"...</h1>
                <div className='cards'>
                {games
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
            </div>
         }
        {!loading ? <Pagination amount={games.length}/> : null}
        </>
    )
}
