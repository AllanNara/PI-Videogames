import { GET_GAMES_NAME, GET_VIDEOGAMES, GET_GAME_DETAIL, IS_LOADING, CLEAR_STATE } from "../action-types";

const initialState = {
    allVideogames: [],
    gameDetail: [],
    gamesByName: [],
    stateLoading: undefined
}

export default function rootReducer(state = initialState, { type, payload}) {
    switch (type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames: payload
            };
        case GET_GAMES_NAME:
            return {
                ...state,
                gamesByName: payload
            };
        case GET_GAME_DETAIL:
            return {
                ...state,
                gameDetail: payload
            };
        case IS_LOADING:
            return {
                ...state,
                stateLoading: payload
            };
        case CLEAR_STATE:
            return {
                ...state
            };
        default: return state
    }
}
