import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import PeoplePage from "./components/pages/PeoplePage2";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/PeopleForm";
import PlanetsForm from "./components/PlanetsForm";
import StarshipsForm from "./components/StarshipsForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/common/NotFound";
import {getPeople} from "./services/peopleService";
import {getPlanets} from "./services/planetsService";
import {getStarships} from "./services/starshipsService";
import {useDispatch} from 'react-redux';
import {setPeople} from './store/actions/people';
import {setPlanets} from "./store/actions/planets";
import {setStarships} from "./store/actions/starships";


// for intro/learning purposes
const columns = ['First', 'Last', 'Handle']
const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
]

//

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const peopleResponse = await getPeople()
            dispatch(setPeople(peopleResponse));

            const planetsResponse = await getPlanets()
            dispatch(setPlanets(planetsResponse));

            const starshipsResponse = await getStarships()
            dispatch(setStarships(starshipsResponse));
        }

        fetchData()
    }, [])

    return (
        <>
            <Navbar/>
            <main className="container">
                <Switch>
                    <Route path="/people/:id" render={props => <PeopleForm {...props}  />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} />}/>
                    <Route path="/planets/:id" render={props => <PlanetsForm {...props}  />}/>
                    <Route path="/planets" component={PlanetsPage}/>
                    <Route path="/starships/:id" render={props => <StarshipsForm {...props}  />}/>
                    <Route path="/starships" component={StarshipsPage}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        </>

    );
}

export default App;
