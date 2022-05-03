import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewGame, getAllGenres, getAllPlatforms } from "../redux/action";

export default function CreationForm() {
    const dispatch = useDispatch();
    const genresList = useSelector(state => state.allGenres);
    const platformsList = useSelector(state => state.allPlatforms);
    const [newGame, setNewGame] = useState({
        name: '',
        description: '',
        platforms: [],
        genres: [],
        image: '',
        released: '',
    });
    
    useEffect(() => {
        dispatch(getAllGenres());
        dispatch(getAllPlatforms())
    }, [dispatch])
    

    const handleChange = (e) => {
        setNewGame({
            ...newGame,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postNewGame(newGame))
    };

    const selectOption = (e) => {
        if(e.target.value !== 'DEFAULT' && !newGame[e.target.name].includes(e.target.value)) {
                setNewGame({
                    ...newGame,
                    [e.target.name]: [...newGame[e.target.name], e.target.value]
                });
            }
        e.target.value = 'DEFAULT'
    };

    const removeItem = (e) => {
        e.preventDefault()
        setNewGame({
            ...newGame,
            [e.target.name]: newGame[e.target.name].filter(item => item !== e.target.value)
        })
    };

    function* generatorKey() {
        let number = 100000
        while(true) {
            number++;
            yield number
        }
    };
    
    const keyForChild = generatorKey();

    return (
        <form onSubmit={handleSubmit}>

            <label> *Name: 
               <br /> <input type="text" name="name" onChange={handleChange}/> 
            </label>
            <br />
            <label>Image: 
               <br /> <input type="url" name="image" onChange={handleChange}/>
            </label>
            <br />
            <label> *Description:
               <br /> <textarea name="description" onChange={handleChange} ></textarea>
            </label>
            <br />
            <br /> 


            <label> *Platforms: 
               <select name="platforms" onChange={selectOption} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Select...</option>
                    {platformsList.length ? platformsList.map(plat =>{
                       return <option key={plat.id}>{plat.name}</option>
                    }) : null}
                </select>
            </label>
            <br />

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
            <br />

            <label> Genres: 
               <select name="genres" onChange={selectOption} defaultValue={'DEFAULT'}>
               <option value="DEFAULT" disabled>Select...</option>
                    {genresList.length ? genresList.map(gnr =>{
                        return <option key={gnr.id}>{gnr.name}</option>
                    }) : null}
                </select>
            </label>
            <br />

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
            <br />



            <label> Released: 
               <br /> <input type="date" name="released" onChange={handleChange}/> 
            </label>
            <br />
            
            <br /> <button type="submit">Send new Game</button>
            <br />

        </form>
    )
}