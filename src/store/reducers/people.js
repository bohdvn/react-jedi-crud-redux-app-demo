import {ADD_PERSON, CHANGE_BELOVED_STATUS, DELETE_PERSON, SET_PEOPLE} from '../actions/people'
import {nanoid} from "nanoid";

const initialState = {
    allPeople: []
}

function people(state = initialState, action) {
    switch (action.type) {
        case SET_PEOPLE:
            return {
                ...state,
                allPeople: action.people
            };
        case DELETE_PERSON:
            return {
                ...state,
                allPeople: state.allPeople.filter(person => person.id !== action.id)
            };
        case CHANGE_BELOVED_STATUS:
            return {
                ...state,
                allPeople: state.allPeople.map((person) => {
                    return person.id === action.id ? {...person, beloved: !person.beloved} : person
                })
            };
        case ADD_PERSON:
            return {
                ...state,
                allPeople: [state.allPeople, {...action.personData, beloved: false, id: nanoid()}]
            };
        default:
            return state;
    }
}

export default people;