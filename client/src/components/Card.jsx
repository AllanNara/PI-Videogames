import React from "react";
import { Link } from "react-router-dom";
import './styles/Card.css';


export default function Card({name, genres, img, id}) {
    return(
        <Link className='link' to={`/home/videogame/${id}`}>
            <div className="card">
                <img className="image-card" src={img} alt="videogame"/>
                <div>
                    <h2>{name}</h2>
                    <p>{genres.join(', ')}</p>
                </div>
            </div>
        </Link>
    )
}