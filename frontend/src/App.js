import React from "react";
import { Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RestaurantsView from "./components/restaurants-view";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark" style={{padding: 10}}>
                <a href="/restaurants" className="navbar-brand">
                    Find My Lunch
                </a>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/restaurants"]} component={RestaurantsView} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
