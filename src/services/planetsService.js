import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'rotation_period',
    'orbital_period',
    'gender',
    'population',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({name, rotation_period, orbital_period, diameter, population}) => ({
        name,
        rotation_period,
        orbital_period,
        diameter,
        population,
        beloved: false,
        id: nanoid()
    }))
}
