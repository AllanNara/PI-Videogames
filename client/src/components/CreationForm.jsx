import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postNewGame, getAllGenres, getAllPlatforms, getCreatedGames, getVideogames } from "../redux/action";

export default function CreationForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const createdGame = useSelector(state => state.createdGames)
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
    const nameGames = games.map(elem => elem.name)
    // console.log(genresList)
    // console.log(platformsList)
    console.log(games)

    useEffect(() => {
        // console.log('UseEffect')
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        dispatch(getVideogames())
        // dispatch(getCreatedGames());
    }, [dispatch]);


    // console.log(createdGame)

    const handleChange = (e) => {
        if(typeof newGame[e.target.name] === 'object') {
            if(e.target.value !== 'DEFAULT' && !newGame[e.target.name].includes(e.target.value)) {
                const gameCreate = {
                    ...newGame,
                    [e.target.name]: [...newGame[e.target.name], e.target.value]
                };
                setNewGame(gameCreate);
                setErrors(controllers(gameCreate));
            };
            e.target.value = 'DEFAULT'
        } else {
            const gameCreate = {
                ...newGame,
                [e.target.name]: e.target.value
            };
            setNewGame(gameCreate);
            setErrors(controllers(gameCreate));
        }
    };
    
    const removeItem = (e) => {
        e.preventDefault()
        setNewGame({
            ...newGame,
            [e.target.name]: newGame[e.target.name].filter(item => item !== e.target.value)
        })
    };

    const handleSubmit = (e) => {
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

    function* generatorKey() {
        let number = 100000;
        while(true) {
            number++;
            yield number
        }
    };

    const keyForChild = generatorKey();

    // CONTROL DE FORMULARIO
    function controllers(newGame) {
        let errors = {};

        const image = newGame.image ?
        newGame.image.split('.')[newGame.image.split('.').length - 1]
        : null;
        
        if(!newGame.platforms.length) {
            errors.platforms = 'Platform is required'
        } else if(newGame.platforms.includes('Select...') || newGame.genres.includes('Select...')) {
            alert('FATAL ERROR');
            return window.location.reload()
        };
        if(!newGame.name) {
            errors.name = 'Name is required'
        } else if(newGame.name > 40) {
            errors.name = 'Name must have only 40 characters'
        } else if(nameGames.includes(newGame.name)) {
            errors.name = 'El nombre ya existe! Por favor elija otro'
        }
        if(!newGame.description) {
            errors.description = 'Description is required'
        }else if(newGame.description.length < 50) {
            errors.description = 'La descripcion no debe contener menos de 50 caracteres'
        }
        if(!/^[0-9]+(\.[0-9]{0,2})?$/.test(newGame.rating)) {
            errors.rating = 'Rating debe contener solo numeros'
        }else if(newGame.rating > 5 || newGame.rating < 0) {
            errors.rating = 'Rating debe ser un numero entre 0 y 5'
        };
        if(newGame.released > new Date().toISOString().split('T')[0]) {
            errors.released = 'Released debe ser una fecha anterior a la seleccionada'
        } else if(newGame.released < "1958-10-17") {
            errors.released = 'Released debe ser una fecha posterior a la seleccionada'
        };
        if(image) {
            if(image.toLowerCase() !== 'jpg' && image.toLowerCase() !== 'png') {
                 errors.image = 'Image solo acepta URL con formatos .JPG / .PNG'
             };
        };

        return errors
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>*Name:</label>
                <input 
                    type="text" 
                    name="name"
                    value={newGame.name}
                onChange={handleChange}
                className={errors.name && 'danger'}
                />
                <p className={'danger'}>
                  {errors.name}
                </p>
            </div>
            <div>
                <label>Image:</label>
                <input 
                    type="url" 
                    name="image"
                    value={newGame.image}
                    onChange={handleChange} 
                    placeholder='URL de la Imagen'
                    className={errors.image && 'danger'}
                />
                <p className={'danger'}>
                  {errors.image}
                </p>
            </div>
            <div>
                <label>*Description:</label>
                <textarea
                    name="description"
                    value={newGame.description}
                    onChange={handleChange} 
                    className={errors.description && 'danger'}
                />
                <p className={'danger'}>
                  {errors.description}
                </p>            
            </div>
            <div>
                <label>Rating:</label>
                <input 
                    type="number" 
                    step=".01" 
                    name="rating"
                    value={newGame.rating}
                    onChange={handleChange}
                    className={errors.rating && 'danger'}
                    min="0" 
                    max="5"
                />
                <p className={'danger'}>
                  {errors.rating}
                </p> 
            </div>
            <div>
                <label>*Platforms:</label>
                <select 
                    name="platforms"
                    onChange={handleChange} 
                    defaultValue={'DEFAULT'}
                    className={errors.platforms && 'danger'}
                    >
                    <option value="DEFAULT" disabled>Select...</option>
                    {platformsList.length ? platformsList.map(plat =>{
                        return <option key={plat.id}>{plat.name}</option>
                    }) : null}
                </select>
                <p className={'danger'}>
                  {errors.platforms}
                </p> 
                {/* ACA SE MUESTRAN LOS RESULTADOS EN PLATAFORMAS */}
                <div>
                    {newGame.platforms.length ? 
                    newGame.platforms.map(plt => {
                    return <div key={keyForChild.next().value}>
                    <button value={plt} name='platforms' onClick={removeItem}>
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
                        onChange={handleChange} 
                        defaultValue={'DEFAULT'}
                    >
                <option value="DEFAULT" disabled>Select...</option>
                    {genresList.length ? genresList.map(gnr =>{
                            return <option key={gnr.id}>{gnr.name}</option>
                    }) : null}
                    </select>
                {/* ACA SE MUESTRAN LOS RESULTADOS EN GENEROS */}
                <div>
                    {newGame.genres.length ? 
                    newGame.genres.map(gnr =>
                    <div key={keyForChild.next().value}>
                    <button value={gnr} name='genres' onClick={removeItem}>
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
                        onChange={handleChange}
                        className={errors.released && 'danger'}
                        min="1958-10-17"
                        max={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                    />
                    <p className={'danger'}>
                      {errors.released}
                    </p>
            </div>

            <input type="submit" value="Send new Game"/>
        </form>
    )
}