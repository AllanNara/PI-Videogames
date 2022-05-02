import React from "react";
import { Link } from "react-router-dom";

export default function Card({name, genres, img, id}) {
    console.log(genres)
    return(
        <div>
            <img src={img} alt="videogame" style={{height:'300px'}} />
            <Link to={`/home/videogame/${id}`}>
                <h2>{name}</h2>
            </Link>
            <p>{genres}</p>
        </div>
    )
}