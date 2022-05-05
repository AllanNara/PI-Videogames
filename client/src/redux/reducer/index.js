import { 
    POST_NEW_GAME, 
    GET_GAMES_NAME, 
    GET_VIDEOGAMES, 
    GET_GAME_DETAIL, 
    IS_LOADING, 
    CLEAR_STATE,
    GET_ALL_GENRES,
    GET_ALL_PLATFORMS,
    GET_ALL_GAMES_DB
} from "../action-types";

const initialState = {
    allVideogames: [],
    gameDetail: {},
    gamesByName: [],
    allGenres: [],
    allPlatforms: [],
    createdGames: [],
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
        case POST_NEW_GAME:
            return {
                ...state,
                createdGames: [...initialState.createdGames, payload]
        };
        case GET_ALL_GAMES_DB:
            return {
                ...state,
                createdGames: payload
        };
            case IS_LOADING:
        return {
            ...state,
            stateLoading: payload
        };
        case CLEAR_STATE:
            return {
                ...state,
                gameDetail: {}
            };
        default: return state
    }   
}   
