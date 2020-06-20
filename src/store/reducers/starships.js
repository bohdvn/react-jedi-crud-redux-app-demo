import {CHANGE_BELOVED_STATUS, DELETE_STARSHIP, SET_STARSHIPS, ADD_STARSHIP} from '../actions/starships'
import {nanoid} from "nanoid";

const initialState = {
    allStarships: []
}

function starships(state = initialState, action) {
    switch (action.type) {
        case SET_STARSHIPS:
            return {
                ...state,
                allStarships: action.starships
            };
        case DELETE_STARSHIP:
            return {
                ...state,
                allStarships: state.allStarships.filter(starship => starship.id !== action.id)
            };
        case CHANGE_BELOVED_STATUS:
            return {
                ...state,
                allStarships: state.allStarships.map((starship) => {
                    return starship.id === action.id ? {...starship, beloved: !starship.beloved} : starship
                })
            };
        case ADD_STARSHIP:
            return {
                ...state,
                allStarships: [state.allStarships, {...action.starshipData, beloved: false, id: nanoid()}]
            };

        default:
            return state;
    }
}

export default starships;