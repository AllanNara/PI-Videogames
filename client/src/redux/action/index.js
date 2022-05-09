import axios from 'axios';
import {
    GET_GAMES_NAME, 
    POST_NEW_GAME, 
    GET_VIDEOGAMES, 
    GET_GAME_DETAIL, 
    IS_LOADING, 
    CLEAR_STATE,
    GET_ALL_GENRES,
    GET_ALL_PLATFORMS,
    ERROR_EXISTS,
    GET_CREATED_GAMES,
    CURRENT_PAGE
} from "../action-types";

export function getVideogames() {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http://localhost:3001/videogames`)
            .then(response => {dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            });dispatch(isLoading(false))})
            .catch(error => {
                console.log('Error inesperado');
                dispatch(stateError(true));
                dispatch(isLoading(false))
            });
    };
};

export function getGamesName(title) {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http://localhost:3001/videogames?name=${title}`)
            .then(response => {dispatch({
                type: GET_GAMES_NAME,
                payload: response.data
            });dispatch(isLoading(false))})
            .catch(error => {
                console.log('Error inesperado');
                dispatch(stateError(true));
                dispatch(isLoading(false))
            });
    };
};

export function getGameDetail(id) {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then(response => {dispatch({
                type: GET_GAME_DETAIL,
                payload: response.data
            });dispatch(isLoading(false))})
            .catch(error => {
                console.log('Error inesperado');
                dispatch(stateError(true));
                dispatch(isLoading(false))
            });
            
    };
};

export function getCreatedGames() {
    return {
        type: GET_CREATED_GAMES
    }
}

export function getAllGenres() {
    return (dispatch) => {
        axios.get(`http://localhost:3001/genres`)
            .then(response => {dispatch({
                type:GET_ALL_GENRES,
                payload: response.data
            })})
    }
};

export function getAllPlatforms() {
    return(dispatch) => {
        axios.get(`http://localhost:3001/platforms`)
            .then(response => {dispatch({
                type: GET_ALL_PLATFORMS,
                payload: response.data
            })})
    }
};

export function postNewGame(form) {
    return (dispatch) => {
        axios.post(`http://localhost:3001/videogame/`, form)
            .then(response => {dispatch({
                type: POST_NEW_GAME,
                payload: response.data
            });console.log(response.data)})
    }
};

export function isLoading(payload) {
    return {
        type: IS_LOADING,
        payload
    }
};

export function stateError(payload) {
    return {
        type: ERROR_EXISTS,
        payload
    }
};

export function clearState() {
    return {
        type: CLEAR_STATE
    }
};

export function currentPage(payload) {
    return {
        type: CURRENT_PAGE,
        payload
    }
}