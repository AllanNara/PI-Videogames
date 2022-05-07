import React, { useEffect } from "react";
import { getVideogames } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Landing() {
    // const dispatch = useDispatch()
    // const games = useSelector(state => state.allVideogames);

    // useEffect(() => {
    //     dispatch(getVideogames())
    // }, [dispatch]);

    // console.log(games)
    // const nameGames = games.map(elem => elem.name)
    // console.log(nameGames)

    return (
        <>
        <h1>WELCOME!</h1>
        <Link to='/home'>
            <h3>START</h3>
        </Link>
        </>
    )
}