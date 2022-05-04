import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail, clearState } from "../redux/action";

export default function GameDetail() {
    const detail = useSelector(state => state.gameDetail)
    const loading = useSelector(state => state.stateLoading);
    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getGameDetail(id));
        return () => dispatch(clearState())
    },[id, dispatch])

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
        {loading ? <span>Loading...</span> : 
         <div>
             <div>
                <h1>{detail.name}</h1>
                <img src={detail.image} alt="game" style={{height:'200px'}} />
             </div>
             <div>
                 <h3>Description:</h3>
                <p>{detail.description}</p>
                 <ul>
                     <li>Rating: {detail.rating}</li>
                     <li>Released: {detail.released}</li>
                     <li>
                         Genres:
                        <ul>
                            {detail.genres ?
                             detail.genres.length ?
                             detail.genres.map(elem => <li key={keyForChild.next().value}>{elem}</li>) : <li>No existen generos asociados</li>
                             : <li>Cargando generos...</li>}
                        </ul>
                     </li>
                     <li>
                         Platforms:
                        <ul>
                            {detail.platforms ?
                             detail.platforms.length ?
                             detail.platforms.map(elem => <li key={keyForChild.next().value}>{elem}</li>) : <li>No existen plataformas asociadas</li>
                             : <li>Cargando generos...</li>}
                        </ul>
                     </li>
                     
                 </ul>
             </div>
         </div>
        }
        </>
    )
}