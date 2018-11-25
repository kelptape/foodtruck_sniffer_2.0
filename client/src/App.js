import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Map from "./pages/Map"
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/Map" component={Map} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;