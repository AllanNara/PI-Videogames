import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postNewGame, getAllGenres, getVideogames } from "../redux/action";
import img from './img/videogame.png';
import './styles/CreationForm.css';
import fn from './controllers'

export default function CreationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genresList = useSelector(state => state.allGenres);
    const platformsList = useSelector(state => state.allPlatforms);
    const games = useSelector(state => state.allVideogames);
    const [errors, setErrors] = useState({});
    const [newGame, setNewGame] = useState({
        name: '',
        description: '',
        rating: 0,
        platforms: [],
        genres: [],
        image: '',
        released: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        dispatch(getAllGenres());
        dispatch(getVideogames())
    }, [dispatch]);

    const change = (e) => {
        const nameGames = games.map(elem => elem.name)
        fn.handleChange(e, newGame, setNewGame, setErrors, nameGames)
    };
    
    const remove = (e) => {
        fn.removeItem(e, newGame, setNewGame)
    };

    const submitForm = (e) => {
        e.preventDefault();
        if(!newGame.name || !newGame.description || !newGame.platforms.length){
            return alert('Faltan datos obligatorios')
        } else if(Object.keys(errors).length) {
            return alert('Verificar si los datos son validos')
        } else {
            dispatch(postNewGame(newGame));
            setNewGame({
                name: '',
                description: '',
                rating: 0,
                platforms: [],
                genres: [],
                image: '',
                released: new Date().toISOString().split('T')[0]
            });
            alert('Juego creado con exito!!');
            return history.push(`/home/create/redirecting`)
        };
    };
    

    return (
        <div className="container">
        <form 
        onSubmit={submitForm}
        className='form-box'
        >
            <h1>Agrega un nuevo juego!</h1>
            <div>
                <label>*Name:</label>
                <input 
                    type="text" 
                    name="name"
                    value={newGame.name}
                onChange={change}
                className={errors.name && 'danger'}
                />
                {errors.name ? <p className={'danger'}>{errors.name}</p> : null}

            </div>
            <div>
                <label>Image:</label>
                <input 
                    type="url" 
                    name="image"
                    value={newGame.image}
                    onChange={change} 
                    placeholder='URL de la Imagen'
                    className={errors.image && 'danger'}
                />
                {errors.image ? <p className={'danger'}>{errors.image}</p> : null}
            </div>

            <div>
                <label>*Description:</label>
                <textarea
                    name="description"
                    value={newGame.description}
                    onChange={change} 
                    className={errors.description && 'danger'}
                />  
                {errors.description ? <p className={'danger'}>{errors.description}</p> : null} 
            </div>

            <div>
                <label>Rating:</label>
                <input 
                    type="number" 
                    step=".01" 
                    name="rating"
                    value={newGame.rating}
                    onChange={change}
                    className={errors.rating && 'danger'}
                    min="0" 
                    max="5"
                />
                {errors.rating ? <p className={'danger'}>{errors.rating}</p> : null}      
            </div>
            
            <div>
                <label>*Platforms:</label>
                <select 
                    name="platforms"
                    onChange={change} 
                    defaultValue={'DEFAULT'}
                    className={errors.platforms && 'danger'}
                    >
                    <option value="DEFAULT" disabled>Select...</option>
                    {platformsList.length ? platformsList.map(plat =>{
                        return <option key={fn.keyForChild.next().value}>{plat}</option>
                    }) : null}
                </select>
                {errors.platforms ? <p className={'danger'}>{errors.platforms}</p> : null}      
                {/* ACA SE MUESTRAN LOS RESULTADOS EN PLATAFORMAS */}
                <div className="genres-items">
                    {newGame.platforms.length ? 
                    newGame.platforms.map(plt => {
                        return <div key={fn.keyForChild.next().value}>
                        <button value={plt} name='platforms' onClick={remove}>
                            <span style={{color: 'blue'}}>X</span> {plt}
                        </button>
                    </div>})
                    : null}
                </div>
            </div>

            <div>
                <label>Genres:</label>
                <select 
                        name="genres" 
                        onChange={change} 
                        defaultValue={'DEFAULT'}
                    >
                    <option value="DEFAULT" disabled>Select...</option>
                    {genresList.length ? genresList.map(gnr =>{
                        return <option key={gnr.id}>{gnr.name}</option>
                    }) : null}
                    </select>
                {/* ACA SE MUESTRAN LOS RESULTADOS EN GENEROS */}
                <div className="genres-items">
                    {newGame.genres.length ? 
                    newGame.genres.map(gnr =>
                    <div key={fn.keyForChild.next().value}>
                    <button value={gnr} name='genres' onClick={remove}>
                        <span style={{color: 'blue'}}>X</span> {gnr}
                    </button>
                    </div>)
                    : null}
                </div>
            </div>
            
            <div>
                <label>Released:</label>
                <input 
                        type="date" 
                        name="released"
                        value={newGame.released}
                        onChange={change}
                        className={errors.released && 'danger'}
                        min="1958-10-17"
                        max={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                    />
                {errors.released ? <p className={'danger'}>{errors.released}</p> : null}      
            </div>

            <input type="submit" value="Send new Game"/>
        </form>
        <div className="image-div">
            <img className="image" src={img} alt='videogame'/>
        </div>        
        </div>
    )
}