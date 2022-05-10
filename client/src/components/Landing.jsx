import React from "react";
import { Link } from "react-router-dom";
import './Landing.css'

export default function Landing() {

    return (
        <div className="landing-image">
            <div className="landing-text">
                <h1>Todos los juegos en un solo lugar</h1>
                <h2>Estas listo para comenzar?</h2>
                <button className="landing-button">
                    <Link to='/home'>
                        <h2>Start</h2>
                    </Link>
                </button>
            </div>
        </div>
    )
}