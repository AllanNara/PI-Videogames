import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameDetail, clearState, stateError } from "../redux/action";

export default function GameDetail() {
    const detail = useSelector(state => state.gameDetail)
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist)
    const dispatch = useDispatch();
    const { id } = useParams()

    // console.log(detail)

    useEffect(() => {
        dispatch(getGameDetail(id));
        return () => {
            dispatch(clearState());
            dispatch(stateError(false))            
        }
    },[id, dispatch])

    return ( 
        <>
        {loading ? <span>Loading...</span> : 
         error ? 
         <div>
             <h1>Error 404: Invalid parameter</h1>
            <h2>No se ha encontrado ninguna coincidencia para el ID "{id}".</h2>
            <Link to ='/home'>
                <h4>Volver a la Home</h4>
            </Link>
         </div>
            :
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
                         {/* {console.log(detail.genres[0].name)}
                         {console.log(detail.genres[0].id)} */}
                        <ul>
                            {detail.genres ?
                             detail.genres.length ?
                             detail.genres.map(elem => <li key={elem.id}>{elem.name}</li>) : <li>No existen generos asociados</li>
                             : <li>Cargando generos...</li>}
                        </ul>
                     </li>
                     <li>
                         Platforms:
                         {console.log(detail.platforms)}
                        <ul>
                            {detail.platforms ?
                             detail.platforms.length ?
                             detail.platforms.map(elem => <li key={elem.id}>{elem.name}</li>) : <li>No existen plataformas asociadas</li>
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