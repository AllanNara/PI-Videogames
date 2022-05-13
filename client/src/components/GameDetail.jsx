import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getGameDetail, clearState, stateError } from "../redux/action";
import Load from "./Load";
import './GameDetail.css'

export default function GameDetail() {
    const detail = useSelector(state => state.gameDetail)
    const loading = useSelector(state => state.stateLoading);
    const error = useSelector(state => state.errorExist)
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getGameDetail(id));
        return () => {
            dispatch(clearState());
            dispatch(stateError(false))            
        }
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
        {loading ? <Load /> : 
         error ? 
         <div>
             <h1>Error 404: Invalid parameter</h1>
            <h2>No se ha encontrado ninguna coincidencia para el ID "{id}".</h2>
            <Link to ='/home'>
                <h4>Volver a la Home</h4>
            </Link>
         </div>
            :
        <div className="contain-detail">
                <img className='image-detail' src={detail.image} alt="game"/>
            <div className="contents">
                {/* <h3>Description:</h3> */}
                <div className="name-description">
                    <h1>{detail.name}</h1>
                    <p>{detail.description}</p>
                </div>
                <div className="details">
                        <div className="details-one">
                            <div>
                                <h4>Rating:</h4>
                                <p>{detail.rating}</p>
                            </div>
                            <div>
                                <h4>Platforms:</h4>
                                <ul>
                                    {detail.platforms ?
                                    detail.platforms.length ?
                                    detail.platforms.map(plat => <li key={keyForChild.next().value}>{plat.name ? plat.name : plat}</li>) : <li>No existen plataformas asociadas</li>
                                    : <li>Cargando plataformas...</li>}
                                </ul>
                            </div>

                        </div>
                        <div className="details-one">
                            <div>
                                <h4>Released:</h4>
                                <p>{detail.released}</p>
                            </div>
                            <div>
                                <h4>Genres:</h4>
                                <ul>
                                    {detail.genres ?
                                    detail.genres.length ?
                                    detail.genres.map(elem => <li key={elem.id}>{elem.name}</li>) : <li>No existen generos asociados</li>
                                    : <li>Cargando generos...</li>}
                                </ul>
                            </div>
                        </div>

                </div>
            </div>
        </div>
        }
        </>
    )
}