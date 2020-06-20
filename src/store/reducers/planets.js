import {ADD_PLANET, CHANGE_BELOVED_STATUS, DELETE_PLANET, SET_PLANETS} from '../actions/planets'
import {nanoid} from "nanoid";

const initialState = {
    allPlanets: []
}

function planets(state = initialState, action) {
    switch (action.type) {
        case SET_PLANETS:
            return {
                ...state,
                allPlanets: action.planets
            };
        case DELETE_PLANET:
            return {
                ...state,
                allPlanets: state.allPlanets.filter(planet => planet.id !== action.id)
            };
        case CHANGE_BELOVED_STATUS:
            return {
                ...state,
                allPlanets: state.allPlanets.map((planet) => {
                    return planet.id === action.id ? {...planet, beloved: !planet.beloved} : planet
                })
            };
        case ADD_PLANET:
            return {
                ...state,
                allPlanets: [state.allPlanets, {...action.planetData, beloved: false, id: nanoid()}]
            };
        default:
            return state;
    }
}

export default planets;