import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetail } from "../redux/action";

export default function GameDetail() {
    const dispatch = useDispatch();
    const detail = useSelector(state => state.gameDetail)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getGameDetail(id));
    },[id, dispatch])
    
    // const response = detail.genres.map(elem =>{return `<li>${elem}</li>`})
    // console.log(id)
    // console.log('Genres :', detail.genres)
    // console.log('Platforms :', detail.platforms)
    // console.log('GENRES MAP :', response)

    return ( 
        <>
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
                            {detail.genres ? detail.genres.map(elem => <li>{elem}</li>) : null}
                        </ul>
                     </li>
                     <li>
                         Platforms:
                        <ul>
                            {detail.platforms ? detail.platforms.map(elem => <li>{elem.platform.name}</li>) : null}
                        </ul>
                     </li>
                     
                 </ul>
             </div>
         </div>
        </>
    )
}