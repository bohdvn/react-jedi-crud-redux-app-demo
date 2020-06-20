export const SET_STARSHIPS = 'SET_STARSHIPS'
export const DELETE_STARSHIP = 'DELETE_STARSHIP'
export const CHANGE_BELOVED_STATUS = 'CHANGE_BELOVED_STATUS'
export const ADD_STARSHIP = 'ADD_STARSHIP'

export function setStarships(starships) {
    return {type: SET_STARSHIPS, starships};
}

export function deleteStarship(id) {
    return {type: DELETE_STARSHIP, id};
}

export function changeBelovedStatus(id) {
    return {type: CHANGE_BELOVED_STATUS, id};
}

export function addStarship(starshipData) {
    return {type: ADD_STARSHIP, starshipData};
}