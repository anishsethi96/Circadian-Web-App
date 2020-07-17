import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateUser from "./components/createUser.component";
import LoginUser from "./components/login.component";
import AddSPD from "./components/spdData.component";
import SPDSelector from "./components/selectSPD.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              Circadian Calculator
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/app1"} className="nav-link">
                  Application 1
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/selectspd"} className="nav-link">
                  Application 2
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Application 3
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
              <Route exact path="/selectspd" component={SPDSelector} />
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
