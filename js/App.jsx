// @flow
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import type { Match } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AsyncRoute from "./AsyncRoute";
import preload from "../data.json";

const FourOhFour = () => <h1>Four Oh Dear Oh Four</h1>;

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/"
                 component={props => <AsyncRoute props={props} loadingPromise={ import('./Landing')}/>} />
          <Route
            path="/search"
            component={props => (
              <AsyncRoute loadingPromise={import('./Search')} props={Object.assign({ shows: preload.shows }, props)} />
            )}
          />
          <Route
            path="/details/:id"
            component={(props: { match: Match }) => {
              const selectedShow = preload.shows.find(
                show => props.match.params.id === show.imdbID
              );
              return <AsyncRoute props={Object.assign({show: selectedShow, match: {} }, props)} loadingPromise={import('./Details')}/>
            }}
          />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
