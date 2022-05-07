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
    GET_CREATED_GAMES
} from "../action-types";

const initialState = {
    gamesByName: [],
    allVideogames: [],
    gameDetail: {},
    allGenres: [],
    allPlatforms: [],
    createdGames: [],
    errorExist: false,
    stateLoading: undefined
}

export default function rootReducer(state = initialState, { type, payload }) {
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
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: payload
            };            
        case GET_ALL_PLATFORMS:
            return {
                ...state,
                allPlatforms: payload
            };
        case GET_CREATED_GAMES:
            return {
                ...state,
                createdGames: state.createdGames
            }
        case POST_NEW_GAME:
            return {
                ...state,
                createdGames: [...state.createdGames, payload]
            };
        case IS_LOADING:
            return {
                ...state,
                stateLoading: payload
            };
        case ERROR_EXISTS:
            return {
                ...state,
                errorExist: payload
            };
        case CLEAR_STATE:
            return {
                ...state,
                gameDetail: {},
                gamesByName: []
            };
        default: return state
    }   
}   
