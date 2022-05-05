import React from "react";
import { Link } from "react-router-dom";

export default function Card({name, genres, img, id}) {
    return(
        <div>
            <Link to={`/home/videogame/${id}`}>
                <h2>{name}</h2>
            </Link>
            <img src={img} alt="videogame" style={{height:'300px'}} />
            <p>{genres.join(', ')}</p>
        </div>
    )
}