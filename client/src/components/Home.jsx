// import React, { useEffect } from "react";
// import { getVideogames } from "../redux/action";
import { useSelector } from 'react-redux'
import Card from "./Card";

export default function Main() {
    const games = useSelector(state => state.allVideogames);
    const loading = useSelector(state => state.stateLoading);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getVideogames())
    // }, [dispatch])

    function* generatorKey() {
        let number = 100000;
        while(true) {
            number++;
            yield number
        }
    };
    const keyForChild = generatorKey();
    
    return (
        <>
         <h1>HOME</h1>
         {loading ? <span>Loading...</span> : 
            games.map(game => 
                <Card 
                    name={game.name} 
                    genres={game.genres} 
                    img={game.image} 
                    id={game.id}
                    key={keyForChild.next().value}
                />
            )      
         }

        </>
    )
}