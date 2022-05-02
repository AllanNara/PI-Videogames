import { GET_GAMES_NAME, GET_VIDEOGAMES, GET_GAME_DETAIL, IS_LOADING, CLEAR_STATE } from "../action-types";
import axios from 'axios';

export function getVideogames() {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http://localhost:3001/videogames`)
            .then(response => {dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            });dispatch(isLoading(false))});
    };
};

export function getGamesName(title) {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http:localhost:3001/videogames?name=${title}`)
            .then(response => {dispatch({
                type: GET_GAMES_NAME,
                payload: response.data
            });dispatch(isLoading(false))});
    };
};

export function getGameDetail(id) {
    return (dispatch) => {
        dispatch(isLoading(true));
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then(response => {dispatch({
                type: GET_GAME_DETAIL,
                payload: response.data
            });dispatch(isLoading(false))});
    };
};

export function isLoading(payload) {
    return {
        type: IS_LOADING,
        payload
    }
};

export function clearState() {
    return {
        type: CLEAR_STATE
    }
};
