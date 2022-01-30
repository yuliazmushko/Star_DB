import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    LoginPage,
    SecretPage} from '../pages';

import './app.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
      this.setState({
        isLoggedIn: true
    });
};

    onServiceChange = () => {
        this.setState(({ swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            };
        });
    };


    render() {

        const { isLoggedIn } = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <Router>

                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet />
                      <Routes>
                          <Route path="/"
                                 element={<h2>Welcome to StarDB</h2>}
                                 exact />
                          <Route path="/people" element={<PeoplePage  />} />
                          <Route path="/planets" element={<PlanetsPage />} />
                          <Route path="/starships" element={<StarshipsPage />} />
                          <Route
                              path="/login"
                              element={
                                  <LoginPage
                                  isLoggedIn={isLoggedIn}
                                  onLogin={this.onLogin} />
                              } />
                          <Route
                              path="/secret"
                              element={
                                  <SecretPage isLoggedIn={isLoggedIn} />
                              } />
                          <Route element={<h2>Page not found</h2>}/>
                      </Routes>
                    </div>

                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
