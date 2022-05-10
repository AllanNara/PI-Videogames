import React from "react";
import { Link } from "react-router-dom";
import './Card.css';


export default function Card({name, genres, img, id}) {
    return(
        <Link className='link' to={`/home/videogame/${id}`}>
            <div className="card">
                <img className="image-card" src={img} alt="videogame"/>
                <div className="content-card">
                    <h2 className="card-title">{name}</h2>
                    <p>{genres.join(', ')}</p>
                </div>
            </div>
        </Link>
    )
}