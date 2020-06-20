import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';

import {starshipsColumns} from "../services/starshipsService";
import {useDispatch} from "react-redux";
import {addStarship} from '../store/actions/starships';

const initialStarshipData = starshipsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const StarshipsForm = ({setStarships, starships, history, match}) => {
    const [formErrors, setFormErrors] = useState({});
    const [starshipData, setStarshipData] = useState({...initialStarshipData});
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const existingStarshipData = starships.find(starship => starship.id === starshipId)
        setStarshipData(existingStarshipData)
        setEditMode(true);
    }, [])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(starshipData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newStarshipsList = starships.map(starship => starship.id === starshipData.id ? starshipData : starship);
            setStarships(newStarshipsList)
        } else {
            dispatch(addStarship(starshipData));
        }
        history.push('/starships')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...starshipData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setStarshipData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {starshipsColumns.map(starshipsColName => (
                <Input
                    key={starshipsColName}
                    name={starshipsColName}
                    label={starshipsColName[0].toUpperCase() + starshipsColName.slice(1)}
                    value={starshipData[starshipsColName]}
                    type={starshipsColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[starshipsColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default StarshipsForm;
