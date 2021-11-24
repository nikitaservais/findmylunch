import React from "react"
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Restaurants from "./components/restaurants.js"

function App() {

  return (
      <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/restaurants" className="navbar-brand">
                  Find My Lunch
              </a>
          </nav>
          <div className="container mt-3">
              <Switch>
                  <Route exact path={["/", "/restaurants"]} component={Restaurants} />
              </Switch>
          </div>
      </div>
  );
}

export default App;
