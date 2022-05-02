import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <>
        <h1>WELCOME!</h1>
        <Link to='/home'>
            <h3>START</h3>
        </Link>
        </>
    )
}