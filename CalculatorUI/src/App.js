import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateUser from "./components/createUser.component";
import LoginUser from "./components/login.component";
import AddSPD from "./components/spdData.component";
import SaveRoom from "./components/saveRoom.component";
import Home from "./components/home.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/home" className="navbar-brand">
              Circadian Calculator
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/app1"} className="nav-link">
                  Normalized SPD
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/saveroom"} className="nav-link">
                  Save Room
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/create"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/saveroom" component={SaveRoom} />
              <Route exact path="/app1" component={AddSPD} />
              <Route exact path="/login" component={LoginUser} />
              <Route exact path="/create" component={CreateUser} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
