import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Map from "./pages/Map"
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import "./App.css";

class App extends Component {

  state= {
    loggedIn: false
  }

  signIn = () => {
    this.setState({ loggedIn: true });
    console.log(this.state.loggedIn)
  }
  
  render() {
    return (
  <div>

  <Header
    loggedIn= {this.state.loggedIn}
    func= {this.signIn}
  />
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>

  </div>
    );
  }
}
export default App;